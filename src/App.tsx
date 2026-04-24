// 1. Remove BrowserRouter from the import
import { Routes, Route, useLocation } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import ProtectedRoute from './api/routes/ProtectedRoute';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import Header from './components/Header/Header';

const App = () => {
  const appLocation = useLocation();
  const isAuthPage = appLocation.pathname === '/auth';

  return (
    <>
      {!isAuthPage && <Header />}
      <Routes>
        <Route path="/auth" element={<AuthPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
