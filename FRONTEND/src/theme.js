import {createTheme } from '@mui/material/styles';
import { createContext, useMemo, useState } from 'react';


export const DarkModeContext = createContext(null)


const useColor = ()=>{
const [mode,setMode] = useState('light')

const toggleColor = useMemo(()=>{
  return ()=>{
setMode((prev)=> prev == 'light'? 'dark':'light')
  }
},[])
 
const theme = useMemo(()=>{
let them = createTheme({
  palette: {
      mode: mode,
   ...(mode == "light"?{
    primary:{main:"#2D60FF"},
    secondary:{main:"#343C6A"},
    background:{main:"#FFFF"},
    grey:{main:"#F5F7FA"},
    link:{main:"#B1B1B1"},
    text:{main:"#232323"},
    green:{main:"#16DBCC"},
    pink:{main:"#FE5C73"},
    blueshade:{main:"#718EBF"}
   }:{
 primary:{main:"#2D60FF"},
    secondary:{main:"#343C6A"},
    background:{main:"#171717"},
    grey:{main:"#0000"},
    link:{main:"#B1B1B1"},
    text:{main:"#232323"},
    green:{main:"#16DBCC"},
    pink:{main:"#FE5C73"},
    blueshade:{main:"#718EBF"}
   }) 
  },
  // typography:{
  //   fontFamily:["Inter", "sans-serif"].join(),
  // }
})
them.typography.body1 = { 
    fontSize:"1.4rem",
     '@media (min-width:600px)': {
    fontSize: '1.6rem',
  },
  }
  them.typography.body2 = {
    fontSize:"1.6rem",
      '@media (min-width:600px)': {
    fontSize: '1.8rem',
  },
  }

    them.typography.h1={
      fontSize:"2.8rem"
    }
    them.typography. h={
      fontSize:"2.2rem"
    }
     them.typography.h3={
      fontSize:"2rem"
    }
     them.typography.h4={
      fontSize:"1.8rem"
    }

return them
},[mode]) 


return [theme,toggleColor]

}





export default useColor