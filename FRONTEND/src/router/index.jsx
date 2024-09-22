import {
  createBrowserRouter
} from "react-router-dom";
import App from "../App";
import Login from "../pages/auth/login";
import DashboardLayout from "../Layouts/dashboard";
import Dashboard from "../pages/dashboard";
import Product from "../pages/dashboard/product";
import Category from "../pages/dashboard/category";

const router = createBrowserRouter([
    {
        path:'/',
        element: <App/>,
        children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "dashboard",
        element: <DashboardLayout />,
        children:[
          {
            path:"",
            element:<Dashboard/>
          },
            {
        path:'products',
        element: <Product/>,
    },
    {
        path:'category',
        element: <Category/>,
    },
        ]
      },
 
    ],
    },
  
])

export default router