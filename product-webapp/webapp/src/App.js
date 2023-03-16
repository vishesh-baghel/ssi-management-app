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

function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<Appwrapper />}>
              <Route index element={<Dashboard />} />
              <Route path="/manageusers" element={<Manageusers />} />
              <Route path="/managessi" element={<Managessi />} />
              <Route path="/addssi" element={<Addssi />} />
              <Route path="/adduser" element={<Adduser />} />
              <Route path="/ssi/:id" element={<Viewssi/>}/>
      </Route>
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/home' element={<Landing />} />
      <Route path='/forgotpassword' element={<ForgotPassword />} />
    </Routes>
    </>
  );
}

export default App;
