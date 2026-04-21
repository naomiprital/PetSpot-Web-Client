import { Routes, Route, useLocation, Navigate, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import HomePage from './pages/HomePage';
import { UserProvider } from './context/UserContext';
import { ListingsProvider } from './context/ListingsContext';
import { ToastContainer } from 'react-toastify';
import AuthPage from './pages/AuthPage';
import ProfilePage from './pages/ProfilePage';
import type { Listing } from './components/ListingCard';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isAuthPage = location.pathname === '/auth';

  const handleLogin = () => {
    setIsAuthenticated(true);
    navigate('/');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate('/auth');
  };

  const onBoost = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    // TODO: Implement boost functionality, remove user from boosts array if exists, add user to boosts array if not exists
  };

  const isUserBoostedListing = (listing: Listing) => {
    const currentUserId = 'id7'; // TODO: Change to user from context
    return listing.boosts.includes(currentUserId);
  };

  return (
    <UserProvider>
      <ListingsProvider>
        {!isAuthPage && <Header onLogout={handleLogout} />}
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <HomePage onBoost={onBoost} isUserBoostedListing={isUserBoostedListing} />
              ) : (
                <Navigate to="/auth" />
              )
            }
          />
          <Route
            path="/auth"
            element={!isAuthenticated ? <AuthPage onLogin={handleLogin} /> : <Navigate to="/" />}
          />
          <Route
            path="/profile"
            element={
              isAuthenticated ? (
                <ProfilePage onBoost={onBoost} isUserBoostedListing={isUserBoostedListing} />
              ) : (
                <Navigate to="/auth" />
              )
            }
          />
        </Routes>
        <ToastContainer position="bottom-left" />
      </ListingsProvider>
    </UserProvider>
  );
};

export default App;
