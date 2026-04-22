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

  return (
    <UserProvider>
      <ListingsProvider>
        {!isAuthPage && <Header onLogout={handleLogout} />}
        <Routes>
          <Route path="/" element={isAuthenticated ? <HomePage /> : <Navigate to="/auth" />} />
          <Route
            path="/auth"
            element={!isAuthenticated ? <AuthPage onLogin={handleLogin} /> : <Navigate to="/" />}
          />
          <Route
            path="/profile"
            element={isAuthenticated ? <ProfilePage /> : <Navigate to="/auth" />}
          />
        </Routes>
        <ToastContainer position="bottom-left" />
      </ListingsProvider>
    </UserProvider>
  );
};

export default App;
