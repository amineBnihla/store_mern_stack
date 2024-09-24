import { Outlet } from "react-router-dom"
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import useColor,{ DarkModeContext } from "./theme";


function App() {
  const [theme,toggleColor] = useColor()
  return (
    <>
    <DarkModeContext.Provider value={{toggleColor}}>
        <ThemeProvider theme={theme}>
      <CssBaseline />
    <Outlet/>
    </ThemeProvider>
    </DarkModeContext.Provider>
    </>
  )
}

export default App
