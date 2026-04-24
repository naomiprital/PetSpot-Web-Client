import { Routes, Route, useLocation } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import ProtectedRoute from './api/routes/ProtectedRoute';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ToastContainer } from 'react-toastify';
import Header from './components/Header/Header';

const App = () => {
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID as string;
  const appLocation = useLocation();
  const isAuthPage = appLocation.pathname === '/auth';

  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      {!isAuthPage && <Header />}
      <Routes>
        <Route path="/auth" element={<AuthPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
      </Routes>
      <ToastContainer position="bottom-left" />
    </GoogleOAuthProvider>
  );
};

export default App;
