import { motion } from "framer-motion"
import AuthLayout from "./layout"
import { Box, Typography } from "@mui/material"
import { useState } from "react"
import { LiaSpinnerSolid } from "react-icons/lia"
import { Link } from "react-router-dom"
import {useAuthStore} from "../../store/authStore.js"
import { CiMail } from "react-icons/ci";
import { IoArrowBackOutline } from "react-icons/io5";
import TextInput from "../../components/TextInput.jsx"
function Forgotpass() {
  const [email,setEmail] = useState("")
  const [isForget,setIsForget] = useState("")

  const {forgetPassword,isLoading} = useAuthStore()
  const [message,setMessage] = useState("")
  const  handleSubmit = async(e)=>{
console.log(email)
    e.preventDefault()
    try {
      await forgetPassword({email})
           setMessage("")

    setIsForget(true)
    } catch (error) {
     setMessage(error.response.data.message)
    }
    
  }

  return (
    <AuthLayout>
            <motion.div initial={{opacity:0,y:40}} animate={{opacity:1,y:0}} transition={{ duration: 1 }} className="bg-[rgba(31,41,55,.3)] backdrop-blur-sm min-w-[350px] rounded-r-2xl text-center">
          <motion.div className="py-5 text-center">
  <Typography variant="h1" fontWeight={'700'} sx={{background:"linear-gradient(to bottom right,#6DCF9D, #55AE8D)",color:"transparent",backgroundClip:"text"}}>Forget Password</Typography>
  </motion.div> 
  {
    isForget ? 
    <div className="text-center flex justify-center items-center flex-col gap-4 px-10 ">
       <div className="w-20 h-20 flex justify-center items-center rounded-full bg-[#55AE8D]">
        <CiMail color="#fff" size={30}/>
       </div>
       <p className="text-white max-w-[350px]">if an account exists for {email} you will recieve a password reset link shortly</p>
    </div>
    :
    <>
       {message && <div className="bg-red-700 border max-w-[90%] mx-auto my-4 border-red-500 text-red-200 rounded-lg text-center py-2 px-3">{message}</div>}

  <p className="text-white text-[1.4rem] mx-auto px-10 mb-10">Enter Your Email Address and we'll send you a link to reset your password</p> 
    <form onSubmit={handleSubmit}>
      <Box sx={{display:"flex",gap:"10px",marginInline:'auto',paddingInline:'20px'}}>
  
    <TextInput Icon={CiMail} value={email} Label='Email' modifierValue={(e)=>setEmail(e.target.value)}/>       

      </Box>
         <motion.button   whileHover={{ scale: 1.01 }}
    whileTap={{ scale: 0.9 }} disabled={isLoading} className="button_primary h-[39px]  max-w-[90%] my-8">
          {
        isLoading ? 
        <LiaSpinnerSolid className="mx-auto animate-spin"/>
        :
        <> Send Reset Link</>
      }
         
        </motion.button>
      

     </form>
    </>
  }
  
         <div className="py-5 mt-5 text-xl bg-gray-900/50 w-full  text-[#6DCF9D] flex justify-center  rounded-b-2xl">
      <Link to={'/login'}  className="w-fit flex gap-5 items-center "><IoArrowBackOutline /> Back to login</Link>  
     </div>
    </motion.div>
      
    </AuthLayout>
  )
}

export default Forgotpass
