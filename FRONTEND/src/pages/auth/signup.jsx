import { Typography} from "@mui/material"
import AuthLayout from "./layout"
import TextInput from "../../components/TextInput"
import { useState } from "react"
import { FiUser } from "react-icons/fi";
import { MdOutlineEmail } from "react-icons/md";
import { GoLock } from "react-icons/go";
import {motion} from 'framer-motion'
import PasswordStrength from "../../components/passwordStrength";
import {Link, useNavigate} from "react-router-dom"
import {useAuthStore} from "../../store/authStore.js"
import { LiaSpinnerSolid } from "react-icons/lia";

const SignUp = ()=>{
   
  const {signup,isLoading} = useAuthStore()
  const [message,setMessage] = useState("")
const [formInfo,setFormInfo] = useState({
  name:"",
  email:"",
  password:""
})
const navigate = useNavigate()
async function handleSignup(e){
  console.log(e)
 e.preventDefault()
  try {
    await signup({...formInfo})
      setMessage("")
     navigate('/forgot-password')
  } catch (error) {
    setMessage(error.response.data.message)
  }
}
    return(
   <>
  <AuthLayout>
    <motion.div initial={{opacity:0,y:40}} animate={{opacity:1,y:0}} transition={{ duration: 1 }} style={{backgroundColor:"rgba(31,41,55,.3)",backdropFilter:'blur(5px)',width:"350px",borderRadius:"16px"}}>  

<div style={{paddingBlock:"20px",textAlign:'center'}}>
  <Typography variant="h1" fontWeight={'700'} style={{background:"linear-gradient(to bottom right,#6DCF9D, #55AE8D)",color:"transparent",backgroundClip:"text"}}>Create Account</Typography>
  </div>     
   {message && <div className="bg-red-700 border max-w-[90%] mx-auto my-4 border-red-500 text-red-200 rounded-lg text-center py-2 px-3">{message}</div>}

     <form onSubmit={handleSignup}>
      <div style={{display:"flex",flexDirection:"column",gap:"20px",marginInline:'auto',maxWidth:"90%"}}>
      <TextInput Icon={FiUser} value={formInfo.name} Label={'Name'} modifierValue={(e)=>setFormInfo({...formInfo,name:e.target.value})}/>
      <TextInput Icon={MdOutlineEmail} value={formInfo.email} Label='Email' modifierValue={(e)=>setFormInfo({...formInfo,email:e.target.value})}/>
      <TextInput Icon={GoLock} type="password" value={formInfo.password} Label='Password' modifierValue={(e)=>setFormInfo({...formInfo,password:e.target.value})}/>
       <PasswordStrength password={formInfo.password}/>
        <motion.button    whileHover={{ scale: 1.01 }}
    whileTap={{ scale: 0.9 }} className="button_primary">
      {
        isLoading ? 
        <LiaSpinnerSolid className="mx-auto animate-spin"/>
        :
        <>Sign Up</>
      }
          
        </motion.button>
      </div>
      

     </form>
     <div className="py-5 mt-5 text-xl bg-gray-900/50  text-white text-center rounded-b-2xl">
      Already have an account? <Link className="text-[#6DCF9D] ml-2" to={'/login'}>Log in</Link>
     </div>
    </motion.div>
  </AuthLayout>
   </>
)
}

export default SignUp