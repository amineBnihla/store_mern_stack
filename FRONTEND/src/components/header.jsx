
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { AppBar, IconButton, Toolbar, useTheme } from '@mui/material';
import { useContext } from 'react';
import { DarkModeContext } from '../theme';
import { MdOutlineLightMode } from "react-icons/md";
import { MdOutlineDarkMode,MdLogout } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { IoMenu } from "react-icons/io5";
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
import { useAuthStore } from '../store/authStore';
export default function Header({drawerWidth,handleDrawerToggle}) {
  const navigate = useNavigate()
  const {logout} = useAuthStore()
   const palette = useTheme().palette
   const {toggleColor} = useContext(DarkModeContext)

   console.log(palette.mode)
  async function handleLogout(){
    try {
      await logout()
      navigate('/login')
    } catch (error) {
      console.log(error)
    } 
   }
  return (
  <AppBar
        position="fixed"
        
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor:palette.background.main
        }}
      >
        <Toolbar sx={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <Box sx={{display:"flex",alignItems:'center'}}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <IoMenu  />
          </IconButton>
          <Typography variant="h3" fontWeight={"500"} color={palette.secondary.main} noWrap component="div">
            Products
          </Typography>
          </Box>

           <Box sx={{display:'flex',justifyContent:'center'}}>
            <IconButton onClick={toggleColor}>
               {palette.mode == "dark" ?<MdOutlineLightMode size={23} /> : <MdOutlineDarkMode size={23} />}
            </IconButton>
            <IconButton onClick={handleLogout} >
            <MdLogout color='#777' size={20}/>
            </IconButton>
           </Box>
        </Toolbar>
      </AppBar>
  );
}