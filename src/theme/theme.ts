import { createTheme } from '@mui/material/styles';
import '@fontsource/heebo/500.css';
import '@fontsource/heebo/600.css';
import '@fontsource/heebo/700.css';
import '@fontsource/heebo/800.css';

export const GOOGLE_COLORS = {
  blue: '#4285F4',
  green: '#34A853',
  yellow: '#FBBC05',
  red: '#EA4335',
} as const;

export const GOOGLE_PHONE_DIALOG_COLORS = {
  orange: '#FF7A1F',
  orangeHover: '#E66A10',
  orangeDisabled: '#FFB885',
  lightOrange: '#FFF8F1',
  darkText: '#1A202C',
  grayText: '#718096',
  lightGrayText: '#A0AEC0',
  cancelBg: '#EDF2F7',
  cancelText: '#4A5568',
} as const;

const theme = createTheme({
  palette: {
    primary: {
      main: '#ED6E26',
    },
    secondary: {
      main: '#2E3B55',
    },
    error: {
      main: '#ef4444',
    },
    success: {
      main: '#22c55e',
    },
    background: {
      default: '#F8FAFC',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#1A1A1A',
      secondary: '#666666',
    },
    grey: {
      100: '#f3f3f5',
      200: '#f1f5f9',
      300: '#e2e8f0',
      400: '#dadee2ff',
    },
  },
  typography: {
    fontFamily: '"Heebo", "Helvetica", "Arial", sans-serif',
    fontWeightRegular: 500,
  },
});

export default theme;
