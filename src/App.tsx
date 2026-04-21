import { Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import HomePage from './pages/HomePage';
import { ToastContainer } from 'react-toastify';
import { ListingsProvider } from './context/ListingsContext';

const Profile = () => <div>Profile Page</div>;

const App = () => {
  return (
    <>
      <ListingsProvider>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        <ToastContainer position="bottom-left" />
      </ListingsProvider>
    </>
  );
};

export default App;
