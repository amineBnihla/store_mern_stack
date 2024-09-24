
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material';
import { useContext } from 'react';
import { DarkModeContext } from '../theme';
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';

export default function Header() {
   const palette = useTheme().palette
   const {toggleColor} = useContext(DarkModeContext)
   console.log(palette.mode)
  return (
    <Box display={'flex'} px={'20px'}  justifyContent={'space-between'}  height={'60px'} alignItems={'center'} sx={{backgroundColor:palette.background.main}}>
  
          <Typography variant="body1" sx={{ flexGrow: 1 }}>
            Overview
          </Typography>
          <Box>
          <Button color="inherit" onClick={toggleColor}>Login</Button>
          </Box>
    </Box>
  );
}