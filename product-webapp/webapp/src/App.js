import Manageusers from './pages/manageusers/Manageusers';
import Managessi from './pages/managessi/Managessi';
import Addssi from './pages/addssi/Addssi';
import Adduser from './pages/adduser/Adduser';
import Dashboard from './pages/dashboard/Dashboard';
import Viewssi from './pages/viewssi/Viewssi';
import { Routes, Route } from 'react-router-dom';
import Appwrapper from './Appwrapper';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Landing from './pages/landingpage/Landing';
import ForgotPassword from './pages/forgotpassword/Forgotpassword';
import Editssi from './pages/editssi/Editssi'
import Viewprofile from './pages/viewprofile/Viewprofile';
import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkUserToken = () => {
    const token = sessionStorage.getItem('token');
    if (!token || token === 'undefined' || token === 'null') {
      setIsLoggedIn(false);
    }
    setIsLoggedIn(true);
  }

  useEffect(() => {
    checkUserToken();
  }, [isLoggedIn]);

  return (
    <>
    <Routes>
    {isLoggedIn ? (
      <Route path='/dashboard' element={<Appwrapper />}>
              <Route index element={<Dashboard />} />
              <Route path="manageusers" element={<Manageusers />} />
              <Route path="managessi" element={<Managessi />} />
              <Route path="addssi" element={<Addssi />} />
              <Route path="adduser" element={<Adduser />} />
              <Route path="ssi/:id" element={<Viewssi/>}/>
              <Route path="editssi/:id" element={<Editssi/>}/>
              <Route path="profile" element={<Viewprofile/>}/>
      </Route>) : (<Route path='*' element={<Navigate to='/login' />} />)
    }
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/' element={<Landing />} />
      <Route path='/forgotpassword' element={<ForgotPassword />} />
    </Routes>
    </>
  );
}

export default App;
