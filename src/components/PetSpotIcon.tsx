import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaw } from '@fortawesome/free-solid-svg-icons';

const PetSpotIcon = ({ onClick }: { onClick?: () => void }) => {
  const [isHovered, setIsHovered] = useState(false);
  const theme = useTheme();

  const iconStyle = {
    width: '3rem',
    height: '3rem',
    backgroundColor: theme.palette.primary.main,
    borderRadius: '1rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.2s ease-in-out',
    transform: isHovered ? 'scale(1.1)' : 'scale(1)',
  };

  return (
    <button
      style={iconStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label="PetSpot Home"
      onClick={onClick}
    >
      <FontAwesomeIcon icon={faPaw} size="xl" />
    </button>
  );
};

export default PetSpotIcon;
