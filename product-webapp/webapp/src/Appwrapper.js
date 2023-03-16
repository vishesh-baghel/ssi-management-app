import { ColorModeContext, useMode } from './themes';
import { CssBaseline, ThemeProvider } from '@mui/material';
import Topbar from './pages/global/Topbar';
import Sidebar from './pages/global/Sidebar';
import { Outlet } from 'react-router-dom';

function Appwrapper() {
  const { colorMode, theme } = useMode();
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar />
          <main className="content">
            <Topbar />
            <Outlet/>
          </main>
        </div>
        </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default Appwrapper;
