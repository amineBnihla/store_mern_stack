
import { Box, Link, Stack, Typography, useTheme } from "@mui/material"
import { TiHome } from "react-icons/ti";
const SideBar = () => {
  const palette = useTheme().palette

  return (
    <Box bgcolor={palette.background.main} height={'100vh'} width={'250px'}>
      
      <Stack>
        <Link sx={{color:palette.link.main,p:"10px 12px",display:'flex',gap:'10px'}} underline="none" href="/">
        <TiHome size={20}/>
        <Typography variant="body2" >Dashboard</Typography> 
        </Link>
        <Link sx={{color:palette.link.main,p:"10px 12px"}} underline="none" href="/"><Typography variant="body2" >Dashboard</Typography> </Link>
        <Link sx={{color:palette.link.main,p:"10px 12px"}} underline="none" href="/"><Typography variant="body2" >Dashboard</Typography> </Link>
      </Stack>
      
    </Box>
  )
}

export default SideBar
