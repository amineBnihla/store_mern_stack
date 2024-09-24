import { Outlet } from "react-router-dom"
import Header from '../components/header'
import { Box, useTheme } from "@mui/material"
import SideBar from "../components/sidebar"
const DashboardLayout = () => {
    const palette = useTheme().palette
  return (
    <>
    <Box display={'flex'}>
     <SideBar/>
     <Box height={"100vh"} flexGrow={'1'} display={'flex'} flexDirection={'column'}>
     <Header/>
     <Box bgcolor={palette.grey.main} flexGrow={"1"}  p={'20px'}>
       <Outlet />
     </Box>
     </Box>
    </Box>
    </>
  )
}

export default DashboardLayout
