import { Routes, Route, useLocation, Navigate, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import { ToastContainer } from 'react-toastify';

const Profile = () => <div>Profile Page</div>;

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isAuthPage = location.pathname === '/auth';

  const handleLogin = () => {
    setIsAuthenticated(true);
    navigate('/');
  };

  return (
    <>
      {!isAuthPage && <Header />}
      <Routes>
        <Route path="/" element={isAuthenticated ? <HomePage /> : <Navigate to="/auth" />} />
        <Route path="/auth" element={!isAuthenticated ? <AuthPage onLogin={handleLogin} /> : <Navigate to="/" />} />
        <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/auth" />} />
      </Routes>
      <ToastContainer position="bottom-left" />
    </>
  );
};

export default App;
