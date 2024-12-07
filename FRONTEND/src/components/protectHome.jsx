import { useAuthStore } from "../store/authStore";
import {  Navigate } from "react-router-dom";
export function ProtectHome({children}){
    const {isAuthenticated,user} = useAuthStore()
 
    if(!isAuthenticated && !user?.isVerified){
        
        return <Navigate to={'/login'} />
    }
    return children
}

export function ProtectLogin({children}){
 
    const {isAuthenticated,user} = useAuthStore()

if(isAuthenticated && user?.isVerified){

     return <Navigate to={'/dashboard'} />
}
return children
}

