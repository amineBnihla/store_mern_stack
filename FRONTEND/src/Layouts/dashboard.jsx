import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';



import Toolbar from '@mui/material/Toolbar';

import { useCallback, useState } from 'react';

import { Outlet } from 'react-router-dom';


import Header from '../components/header';
import SideBar from '../components/sidebar';

const drawerWidth = 240;

function DashboardLayout(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);


  const handleDrawerClose = useCallback(() => {
    setIsClosing(true);
    setMobileOpen(false);
  
},[]) 

  const handleDrawerTransitionEnd = useCallback(() => {
    setIsClosing(false);
  },[]);

  const handleDrawerToggle = useCallback(() => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  },[]);



  // Remove this const when copying and pasting into your project.
  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Header drawerWidth={drawerWidth} handleDrawerToggle={handleDrawerToggle}  />
      <SideBar container={container} mobileOpen={mobileOpen} drawerWidth={drawerWidth} handleDrawerTransitionEnd={handleDrawerTransitionEnd} handleDrawerClose={handleDrawerClose}/>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: {xs:'100%',sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
      <Outlet/>
      </Box>
    </Box>
  );
}

DashboardLayout.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * Remove this when copying and pasting into your project.
   */
  window: PropTypes.func,
};

export default DashboardLayout;
