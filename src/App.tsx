import { Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';

const Home = () => <div>Home Page</div>;
const Profile = () => <div>Profile Page</div>;

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
};

export default App;
