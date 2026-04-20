import { Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import { UserProvider } from './context/UserContext';
import { ListingsProvider } from './context/ListingsContext';

const App = () => {
  return (
    <UserProvider>
      <ListingsProvider>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </ListingsProvider>
    </UserProvider>
  );
};

export default App;
