import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Error from './Error';
import Home from './Home';
import Report from './Report';
import Admin from './Admin';
import MyProfile from './MyProfile';

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/home' element={<Home />} />
          <Route path="/report/:username" element={<Report />} />
          <Route path='/admin' element={< Admin />} />
          <Route path='/myprofile' element={< MyProfile />} />
          <Route path='*' element={<Error />} />
        </Routes>

      </Router>
    </>
  );
};

export default App;
