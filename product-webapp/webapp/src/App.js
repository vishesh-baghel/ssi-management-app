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
import Landing from './pages/landingpage/screens/Landing';
import { Helmet } from "react-helmet";

import 'bootstrap/dist/css/bootstrap.css'


function App() {
  const { colorMode, theme } = useMode();
  return (
  // <Landing></Landing>
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar />
          <main className="content">
            <Topbar />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/manageusers" element={<Manageusers />} />
              <Route path="/managessi" element={<Managessi />} />
              <Route path="/addssi" element={<Addssi />} />
              <Route path="/adduser" element={<Adduser />} />
              <Route path="/ssi/:id" element={<Viewssi/>}/>
            </Routes>
          </main>
        </div>
        </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
