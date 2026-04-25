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
import { useLogout } from '../../hooks/useAuth';
import { useUser } from '../../hooks/useUsers';
import { SERVER_BASE_URL } from '../../../utils/consts';
import { toast } from 'react-toastify';

interface MenuCardProps {
  anchorEl: HTMLElement | null;
  handleClose: () => void;
}

const MenuCard = ({ anchorEl, handleClose }: MenuCardProps) => {
  const menuCardOpen = Boolean(anchorEl);
  const id = menuCardOpen ? 'simple-popper' : undefined;
  const navigate = useNavigate();
  const { data: user } = useUser();
  const logoutMutation = useLogout();

  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync();
    } catch (error) {
      toast.error('Failed to logout');
    }

    navigate('/auth');
    handleClose();
  };
  return (
    <Popper
      id={id}
      open={menuCardOpen}
      anchorEl={anchorEl}
      placement="bottom-end"
      sx={{ zIndex: 10 }}
    >
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
          <Typography sx={{ fontSize: '1.1rem', fontWeight: 600 }}>
            {user?.firstName || 'User'} {user?.lastName || ''}
          </Typography>
          <Typography sx={{ fontSize: '0.9rem', color: 'text.secondary' }}>
            {user?.email || 'No email provided'}
          </Typography>
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
              handleLogout();
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

const Header = () => {
  const navigate = useNavigate();
  const { data: user } = useUser();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

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
        elevation={1}
        sx={{
          bgcolor: 'background.paper',
          top: 0,
          zIndex: 100,
          borderBottom: '1px solid',
          borderColor: 'grey.200',
        }}
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
              src={`${SERVER_BASE_URL}${user?.imageUrl}`}
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
      <MenuCard anchorEl={anchorEl} handleClose={handleClose} />
    </>
  );
};

export default Header;
