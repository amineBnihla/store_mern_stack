import { Outlet } from "react-router-dom"

import Header from '../components/header'
const DashboardLayout = () => {
  return (
    <>
     <Header/>
         <Outlet />
    </>
  )
}

export default DashboardLayout
