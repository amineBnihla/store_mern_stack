import { Outlet } from "react-router-dom"
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import useColor,{ DarkModeContext } from "./theme";
import { ErrorBoundary } from "react-error-boundary";
import {  useLayoutEffect } from "react";
import { useAuthStore } from "../src/store/authStore";
import  { Toaster } from 'react-hot-toast';
function App() {
  const [theme,toggleColor] = useColor()
  const {verify_auth,isLoading} = useAuthStore()
  useLayoutEffect(()=>{
        verify_auth()
    },[verify_auth])
     if (isLoading) {
    return <div>Loading...</div>; // Display a loader until ready
  }
  return (
    <>

    <DarkModeContext.Provider value={{toggleColor}}>
        <ThemeProvider theme={theme}>
      <CssBaseline />
  <ErrorBoundary fallback={<div>Something went wrong</div>}>
    <Outlet/>
    <Toaster/>
  </ErrorBoundary>
    </ThemeProvider>
    </DarkModeContext.Provider>
    </>
  )
}

export default App
