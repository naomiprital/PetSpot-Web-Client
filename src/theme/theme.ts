import { createTheme } from '@mui/material/styles';
import '@fontsource/heebo/600.css';
import '@fontsource/heebo/700.css';
import '@fontsource/heebo/800.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ED6E26',
    },
    secondary: {
      main: '#2E3B55',
    },
    background: {
      default: '#F8FAFC',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#1A1A1A',
      secondary: '#666666',
    },
  },
  typography: {
    fontFamily: '"Heebo", "Helvetica", "Arial", sans-serif',
  },
});

export default theme;
