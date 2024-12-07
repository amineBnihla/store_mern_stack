
import { Box, Divider, Drawer, List, ListItem, Toolbar, Typography, useTheme } from "@mui/material"
import { useState } from "react";

import {Link} from 'react-router-dom'
// import { FiHome } from "react-icons/fi";
import { BiSitemap } from "react-icons/bi";

import { MdOutlineInventory2 } from "react-icons/md";

const Links = [
// {
//   title:"Dashboard",
//   to:"/dashboard",
//   icon: <FiHome size={23}/>
// },
{
  title:"Categories",
  to:"/categories",
  icon: <BiSitemap size={23}/>
},
{
  title:"Products",
  to:"/products",
  icon: <MdOutlineInventory2 size={23}/>
}
]

const SideBar = ({drawerWidth,container,mobileOpen,handleDrawerTransitionEnd,handleDrawerClose}) => {
  const palette = useTheme().palette
  const [selected,setSelected] = useState()
    const drawer = (
    <div>
      <Toolbar sx={{display:'grid',placeItems:'center'}}>
        <Typography variant='h1' fontWeight={'semibold'} color={palette.secondary.main} >
          STORE
        </Typography>
      </Toolbar>
      <Divider />
      <List sx={{mt:3}}>
        {Links.map((link) => (
          <ListItem key={link.title} disablePadding>
            <Box sx={{
              flexGrow:1,
              '& a:hover':{
                color:`${palette.primary.main} !important;`
              }
            }}>
              <Link onClick={()=>setSelected(link.title)} to={link.to} style={
                {
                  color:selected == link.title ?palette.primary.main:palette.link.main,display:'flex',
                  alignItems:'center',padding:'10px 20px',
                gap:'20px',textDecoration:'none',
               width:'100%'
                }}>
               {link.icon}
               <Typography>
                {link.title}
               </Typography>
              </Link>

            </Box>
          </ListItem>
        ))}
      </List>
    </div>
  );
  return (
     <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
  )
}

export default SideBar
