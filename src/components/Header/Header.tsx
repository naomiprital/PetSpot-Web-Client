import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import PetSpotIcon from '../PetSpotIcon';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {
  Box,
  Card,
  Divider,
  IconButton,
  Popper,
  MenuItem,
  MenuList,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { useState } from 'react';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';

interface MenuCardProps {
  anchorEl: HTMLElement | null;
  handleClose: () => void;
  onLogout?: () => void;
}

const MenuCard = ({ anchorEl, handleClose, onLogout }: MenuCardProps) => {
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;
  const navigate = useNavigate();
  const { user } = useUser();

  return (
    <Popper id={id} open={open} anchorEl={anchorEl} placement="bottom-end" sx={{ zIndex: 10 }}>
      <Card
        sx={{
          minWidth: '13rem',
          marginTop: '0.5rem',
          boxShadow: '0px 8px 24px rgba(149, 157, 165, 0.15)',
          border: '1px solid #ebebebff',
          borderRadius: '0.7rem',
        }}
      >
        <Box sx={{ margin: '1rem' }}>
          <Typography sx={{ fontSize: '1.1rem' }}>{user.firstName} {user.lastName}</Typography>
          <Typography sx={{ fontSize: '0.9rem', color: 'text.secondary' }}>{user.email}</Typography>
        </Box>
        <Divider />
        <MenuList>
          <MenuItem
            onClick={() => {
              navigate('/');
              handleClose();
            }}
          >
            <ListItemIcon>
              <HomeIcon sx={{ fontSize: '1.25rem' }} />
            </ListItemIcon>
            <ListItemText primary="Home Feed" />
          </MenuItem>

          <MenuItem
            onClick={() => {
              navigate('/profile');
              handleClose();
            }}
          >
            <ListItemIcon>
              <PersonIcon sx={{ fontSize: '1.25rem' }} />
            </ListItemIcon>
            <ListItemText primary="My Profile" />
          </MenuItem>
          <Divider />
          <MenuItem
            onClick={() => {
              if (onLogout) onLogout();
              handleClose();
            }}
          >
            <ListItemIcon>
              <LogoutIcon sx={{ color: 'red', fontSize: '1.25rem' }} />
            </ListItemIcon>
            <ListItemText primary="Logout" sx={{ color: 'red' }} />
          </MenuItem>
        </MenuList>
      </Card>
    </Popper>
  );
};

interface HeaderProps {
  onLogout?: () => void;
}

const Header = ({ onLogout }: HeaderProps) => {
  const navigate = useNavigate();
  const { user } = useUser();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <AppBar
        position="sticky"
        color="transparent"
        sx={{ bgcolor: 'background.paper', top: 0, zIndex: 100 }}
      >
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <PetSpotIcon
              onClick={() => {
                navigate('/');
              }}
            />
            <Typography
              color="text.primary"
              sx={{ fontSize: '1.5rem', marginLeft: '0.5rem', fontWeight: '700' }}
            >
              PetSpot
            </Typography>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              border: '1px solid #e2e2e2ff',
              borderRadius: '5rem',
              padding: '0.1rem 0.5rem',
            }}
          >
            <img
              src={user.avatarUrl}
              style={{ width: '2.2rem', height: '2.2rem', borderRadius: '50%', objectFit: 'cover' }}
              alt="Profile"
            />
            <IconButton
              sx={{ '&:hover': { backgroundColor: 'transparent' } }}
              onClick={handleMenuClick}
            >
              <KeyboardArrowDownIcon color="secondary" />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <MenuCard anchorEl={anchorEl} handleClose={handleClose} onLogout={onLogout} />
    </>
  );
};

export default Header;
