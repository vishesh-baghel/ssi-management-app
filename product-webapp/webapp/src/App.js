import { ColorModeContext, useMode } from './themes';
import { CssBaseline, ThemeProvider } from '@mui/material';
import Topbar from './pages/global/Topbar';
import Sidebar from './pages/global/Sidebar';
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
import Landing from './pages/landingpage/screens/Landing';
import Editssi from './pages/editssi/Editssi'

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
              <Route path="/editssi/:id" element={<Editssi/>}/>
      </Route>
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/home' element={<Landing />} />
    </Routes>
    </>
  );
}

export default App;
