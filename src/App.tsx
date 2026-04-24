import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import HomePage from './pages/HomePage';
import { UserProvider, useUser } from './context/UserContext';
import { ListingsProvider } from './context/ListingsContext';
import { ToastContainer } from 'react-toastify';
import AuthPage from './pages/AuthPage';
import ProfilePage from './pages/ProfilePage';
import { Box, CircularProgress } from '@mui/material';

const AppContent = () => {
  const { user, isLoading } = useUser();
  const appLocation = useLocation();
  const isAuthPage = appLocation.pathname === '/auth';

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      {!isAuthPage && <Header />}
      <Routes>
        <Route path="/" element={user ? <HomePage /> : <Navigate to="/auth" />} />
        <Route
          path="/auth"
          element={!user ? <AuthPage /> : <Navigate to="/" />}
        />
        <Route
          path="/profile"
          element={user ? <ProfilePage /> : <Navigate to="/auth" />}
        />
      </Routes>
      <ToastContainer position="bottom-left" />
    </>
  );
};

const App = () => {
  return (
    <UserProvider>
      <ListingsProvider>
        <AppContent />
      </ListingsProvider>
    </UserProvider>
  );
};

export default App;
