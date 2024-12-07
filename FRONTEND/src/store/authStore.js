
import { create } from "zustand";
import { api } from "../api";


export const useAuthStore = create((set,get)=>({
    user:{},
    isAuthenticated:false,
    isCheckAuth:false,
    message:"",

    
    isLoading:true,
    signup:async ({email,password,name})=>{
        set({isLoading:true,errorMessage:""})
     try{
          const res = await api.post(`/auth/signup`,{email,name,password})
          if(!res.data.user){
            set({user:res.data.user})
          }
          set({isLoading:false,errorMessage:""})
     }catch(error){
          console.log(error)
          set({isLoading:false,errorMessage:error.response.data.message || "Error sign up"})
          throw error
     }
    },
    verifyAccount: async (code)=>{
      set({isLoading:true,errorMessage:""})
     try{
          const res = await api.post(`/auth/verify_user`,{code:code.join('')})
          if(!res.data.data){
            set({user:res.data.data})
          }
          set({isLoading:false,errorMessage:""})
     }catch(error){
          console.log(error)
          set({isLoading:false,errorMessage:error.response.data.message || "Error sign up"})
          throw error
     }
    },
    login:async ({email,password})=>{
    set({isLoading:false,errorMessage:""})
    try {
     const response = await api.post(`/auth/login`,{email,password})
       if(response.data.user){
          set({user:response.data.user})
       }
       set({isLoading:false,error:""})
} catch (error) {
       set({isLoading:false,errorMessage:error.response.data.message})
       throw error
    }
    },
    verify_auth:async ()=>{
     set({error:"",errorMessage:"",isAuthenticated:false})
     try {
          const res = await api.get(`/auth/verify-user`)
          set({user:res.data.user,isAuthenticated:true,isLoading:false})
          console.log(get().user,get().isAuthenticated)
     } catch (error) {
           set({isAuthenticated:false,isLoading:false})
           throw error
     }
    },
     forgetPassword:async ({email})=>{
    set({isLoading:false,errorMessage:""})
    try {
      await api.post(`/auth/forget-password`,{email})
       set({isLoading:false,errorMessage:""})
} catch (error) {
       set({isLoading:false,errorMessage:error.response.data.message})
       throw error
    }
    },
      resetPassword:async (token,password,confirmationPassword)=>{
    set({isLoading:false,errorMessage:""})
    try {
     const response = await api.post(`/auth/reset-password/${token}`,{password,confirmationPassword})
       console.log(response)
       set({isLoading:false,error:""})
} catch (error) {
       set({isLoading:false,errorMessage:error.response.data.message})
       throw error
    }
    },
    logout:async ()=>{
     try {
          await api.post('/auth/logout') 
     } catch (error) {
          console.log(error)
     }
    },
    error_vide:()=>{
     set({errorMessage:""})
    }

}))