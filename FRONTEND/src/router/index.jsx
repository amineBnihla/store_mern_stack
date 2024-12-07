import {
  createBrowserRouter,
} from "react-router-dom";
import App from "../App";
import Login from "../pages/auth/login";
import DashboardLayout from "../Layouts/dashboard";
import Dashboard from "../pages/dashboard";
import Product from "../pages/dashboard/product";
import Category from "../pages/dashboard/category";
import SignUp from "../pages/auth/signup";
import Forgotpassword from "../pages/auth/forgot-password";
import { ProtectHome,ProtectLogin } from "../components/protectHome";

import Forgotpass from "../pages/auth/forget-pass";
import ResetPassword from "../pages/auth/reset-password";

const router = createBrowserRouter([
    {
        path:'/',
        element: <App/>,
        children: [
      {
        path: "login",
        element: <ProtectLogin><Login /></ProtectLogin>,
      },
      {
        path: "forget-pass",
        element: <ProtectLogin><Forgotpass /></ProtectLogin>,
      },
      {
        path: "reset-password/:token",
        element: <ProtectLogin><ResetPassword /></ProtectLogin>,
      },
      {
        path: "forgot-password",
        element: <ProtectLogin><Forgotpassword /></ProtectLogin>,
      },
       {
        path: "signup",
        element: <ProtectLogin><SignUp/></ProtectLogin>,
      },
      {
        path: "",
        element: <ProtectHome><DashboardLayout /></ProtectHome>,
        children:[
          {
            path:"dashboard",
            element:<Dashboard/>
          },
            {
        path:'products',
        element: <Product/>,
    },
    {
        path:'categories',
        element: <Category/>,
    },
        ]
      },
 
    ],
    },
  
])

export default router