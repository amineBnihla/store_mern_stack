import {  Typography} from "@mui/material"
import AuthLayout from "./layout"
import TextInput from "../../components/TextInput"
import { useState } from "react"
import { GoLock } from "react-icons/go";
import {motion} from 'framer-motion'
import { useNavigate, useParams } from "react-router-dom"
import { useAuthStore } from "../../store/authStore";
import toast from 'react-hot-toast';
import { LiaSpinnerSolid } from "react-icons/lia";
const ResetPassword = () => {
    // const Box2 = motion(Box)
    const {resetPassword,isLoading} = useAuthStore()
      const [message,setMessage] = useState("")
const [formInfo,setFormInfo] = useState({
  password_confirmation:"",
  password:""
})
const navigate = useNavigate()
const {token} = useParams()
const handleReset = async (e)=>{
e.preventDefault()
if(formInfo.password != formInfo.password_confirmation){
    toast('password and password confirmation should match ');
    return
}
try {
  await resetPassword(token,formInfo.password,formInfo.password_confirmation)
  toast.success('Password reset successfuly!')
  
  navigate('/login')
} catch (error) {
setMessage(error.response.data.message)
}
}
  return (
  <AuthLayout>
    <motion.div initial={{opacity:0,y:40}} animate={{opacity:1,y:0}} transition={{ duration: 1 }} style={{backgroundColor:"rgba(31,41,55,.3)",backdropFilter:'blur(5px)',width:"350px",borderRadius:"16px"}}>  
<motion.div style={{paddingBlock:"20px",textAlign:'center'}}>
  <Typography variant="h1" fontWeight={'700'} style={{background:"linear-gradient(to bottom right,#6DCF9D, #55AE8D)",color:"transparent",backgroundClip:"text"}}>Reset Password</Typography>
  </motion.div>     
       {message && <div className="bg-red-700 border max-w-[90%] mx-auto my-4 border-red-500 text-red-200 rounded-lg text-center py-2 px-3">{message}</div>}

     <form onSubmit={handleReset}>
      <div style={{display:"flex",flexDirection:"column",gap:"20px",marginInline:'auto',maxWidth:"90%"}}>
      <TextInput type="password" Icon={GoLock} value={formInfo.password} Label='Password' modifierValue={(e)=>setFormInfo({...formInfo,password:e.target.value})}/>       
      <TextInput type="password" Icon={GoLock} value={formInfo.password_confirmation} Label='Password Confirmation' modifierValue={(e)=>setFormInfo({...formInfo,password_confirmation:e.target.value})}/>
         <motion.button  type="submit"  whileHover={{ scale: 1.01 }}
    whileTap={{ scale: 0.9 }} className="button_primary mb-3">
         {isLoading ? 
        <LiaSpinnerSolid className="mx-auto animate-spin"/>
        :
          'Set New Password'
          }
        </motion.button>
      </div>
      

     </form>
    </motion.div>
  </AuthLayout>
  )
}

export default ResetPassword
