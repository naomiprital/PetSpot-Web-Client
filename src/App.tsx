import { Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import HomePage from './pages/HomePage';
import { ToastContainer } from 'react-toastify';

const Profile = () => <div>Profile Page</div>;

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <ToastContainer position="bottom-left" />
    </>
  );
};

export default App;
