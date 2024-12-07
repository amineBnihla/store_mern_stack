import {  Typography} from "@mui/material"
import AuthLayout from "./layout"
import TextInput from "../../components/TextInput"
import {  useState } from "react"
import { MdOutlineEmail } from "react-icons/md";
import { GoLock } from "react-icons/go";
import {motion} from 'framer-motion'
import {Link, useNavigate} from "react-router-dom"
import { useAuthStore } from "../../store/authStore";
import { LiaSpinnerSolid } from "react-icons/lia";
const Login = () => {
    // const Box2 = motion(Box)
    const [message,setMessage] = useState("")
    const {login,isLoading} = useAuthStore()
const [formInfo,setFormInfo] = useState({
  email:"",
  password:""
})

const navigate = useNavigate()
const handleLogin = async (e)=>{
e.preventDefault()
try {
  await login(formInfo)
  setMessage("")
  navigate('/dashboard')

} catch (error) {
  // console.log(error)
  setMessage(error.response.data.message)
}
}
  return (
  <AuthLayout>
    <motion.div initial={{opacity:0,y:40}} animate={{opacity:1,y:0}} transition={{ duration: 1 }} style={{backgroundColor:"rgba(31,41,55,.3)",backdropFilter:'blur(5px)',width:"350px",borderRadius:"16px"}}>  
<motion.div style={{paddingBlock:"20px",textAlign:'center'}}>
  <Typography variant="h1" fontWeight={'700'} style={{background:"linear-gradient(to bottom right,#6DCF9D, #55AE8D)",color:"transparent",backgroundClip:"text"}}>Welcome Back</Typography>
  </motion.div>     
       {message && <div className="bg-red-700 border max-w-[90%] mx-auto my-4 border-red-500 text-red-200 rounded-lg text-center py-2 px-3">{message}</div>}

     <form onSubmit={handleLogin}>
      <div style={{display:"flex",flexDirection:"column",gap:"20px",marginInline:'auto',maxWidth:"90%"}}>
      <TextInput Icon={MdOutlineEmail} ty value={formInfo.email} Label='Email' modifierValue={(e)=>setFormInfo({...formInfo,email:e.target.value})}/>
      <TextInput type="password"  Icon={GoLock} value={formInfo.password} Label='Password' modifierValue={(e)=>setFormInfo({...formInfo,password:e.target.value})}/>       
        <Link className="text-[#6DCF9D] ml-2" to={'/forget-pass'}>Forget password?</Link>
         <motion.button   whileHover={{ scale: 1.01 }}
    whileTap={{ scale: 0.9 }} className="button_primary mb-3">
         {isLoading ? 
        <LiaSpinnerSolid className="mx-auto animate-spin"/>
        :
          'Login'
          }
        </motion.button>
      </div>
      

     </form>
  

     <div className="py-5 mt-5 text-xl bg-gray-900/50  text-white text-center rounded-b-2xl">
      Don't have an account? <Link className="text-[#6DCF9D] ml-2" to={'/signup'}>Sign up</Link>
     </div>
    </motion.div>
  </AuthLayout>
  )
}

export default Login
