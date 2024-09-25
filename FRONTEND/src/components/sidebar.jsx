
import { Box, Stack, Typography, useTheme } from "@mui/material"
import { useState } from "react";
import { TiHome } from "react-icons/ti";
import { FaFileInvoiceDollar } from "react-icons/fa6";
import {Link} from 'react-router-dom'

const Links = [
{
  title:"Dashboard",
  to:"/dashboard",
  icon: <TiHome size={20}/>
},
{
  title:"Products",
  to:"/dashboard/products",
  icon: <FaFileInvoiceDollar size={20}/>
}
]

const SideBar = () => {
  const palette = useTheme().palette
  const [selected,setSelected] = useState()

  return (
    <Box bgcolor={palette.background.main} height={'100vh'} width={'250px'}>
      <Box p={"20px"} textAlign={"center"}>
      <Typography  variant="h1" fontWeight={"bold"} color={palette.secondary.main}>
        STORE
      </Typography>
      </Box>
      <Stack mt={"40px"}>
        {
          Links.map((link)=>(
        <Link style={{color:link.title == selected ? palette.primary.main : palette.link.main,textDecoration:"none",padding:"10px 12px 10px 30px",display:'flex',alignItems:"center",gap:'10px'}}  underline="none" to={link.to} onClick={()=>setSelected(link.title)}>
        {link.icon}
        <Typography variant="body1" >{link.title}</Typography> 
        </Link>
          ))
        }
      </Stack>
      
    </Box>
  )
}

export default SideBar
