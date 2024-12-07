import { motion } from "framer-motion"
import AuthLayout from "./layout"
import { Box, Typography } from "@mui/material"
import {  useCallback, useEffect, useRef, useState } from "react"
import { LiaSpinnerSolid } from "react-icons/lia"
import { useNavigate } from "react-router-dom"
// import TextInputVerify from "../../components/textInputVerify"
import {useAuthStore} from "../../store/authStore.js"
function Forgotpassword() {
  //  const Box2 = motion(Box)
  //  const [verifyCode,setVerifyCode] = useState({
  //  oneNumber:"",
  //  twoNumber:"",
  //  threeNumber:"",
  //  fourNumber:"",
  //  fiveNumber:"",
  //  sixNumber:"",
  //  })
  const [verifyCode,setVerifyCode] = useState(["","","","","",""])
  const inputRefs=useRef([])
  const {verifyAccount,isLoading} = useAuthStore()
  const [message,setMessage] = useState("")
  const navigate = useNavigate()
  function onchangeCode(value,index){
    // if(e.target.value == "") {
    //   setCurrent(index-1)
    //    return
    //   }
const newCode = [...verifyCode];

		// Handle pasted content
		if (index<5 && value.length > 1) {
			const pastedCode = value.slice(0, 6).split("");
			for (let i = 0; i < 6; i++) {
				newCode[i] = pastedCode[i] || "";
			}
			setVerifyCode(newCode);

			// Focus on the last non-empty input or the first empty one
			const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "");
			const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
			inputRefs.current[focusIndex].focus();
		} else {
			newCode[index] = value.split("")[0] || "";
			setVerifyCode(newCode);

			// Move focus to the next input field if value is entered
			if (value && index < 5) {
				inputRefs.current[index + 1].focus();
			}
		}
    
    // setCurrent(index+1)
  }
  const  onKeyPress = (e,index)=>{
    
    if(e.key === "Backspace" && !verifyCode[index] && index > 0){

      inputRefs.current[index-1].focus()
    }
  }
  const  handleSubmit = useCallback(async(e)=>{
    e.preventDefault()
    try {
      await verifyAccount(verifyCode)
      setMessage("")
    navigate('/dashboard')
    } catch (error) {
     setMessage(error.response.data.message)
    }
    
  },[verifyAccount,verifyCode,navigate])
  useEffect(()=>{
    
   if(verifyCode.every((c)=> c !=="")){
    handleSubmit(new Event("submit"))
   }
  },[verifyCode,handleSubmit])
  return (
    <AuthLayout>
            <motion.div initial={{opacity:0,y:40}} animate={{opacity:1,y:0}} transition={{ duration: 1 }} className="bg-[rgba(31,41,55,.3)] backdrop-blur-sm min-w-[350px] rounded-r-2xl text-center">
          <motion.div className="py-5 text-center">
  <Typography variant="h1" fontWeight={'700'} sx={{background:"linear-gradient(to bottom right,#6DCF9D, #55AE8D)",color:"transparent",backgroundClip:"text"}}>Verify Your Email</Typography>
  </motion.div> 
     {message && <div className="bg-red-700 border max-w-[90%] mx-auto my-4 border-red-500 text-red-200 rounded-lg text-center py-2 px-3">{message}</div>}

  <p className="text-white text-[1.4rem] mx-auto mb-10">Enter The 6 digit cose sent to your email address</p> 
    <form onSubmit={handleSubmit}>
      <Box sx={{display:"flex",gap:"10px",marginInline:'auto',paddingInline:'20px'}}>
     {
      [...Array(6)].map((item,index)=>{
      
        return  <input className="size-20 text-center outline-none focus:border text-white focus:border-[#6DCF9D] py-3 px-4 rounded-md bg-[#1F3134]" key={index} ref={(el)=>(inputRefs.current[index] = el)} maxLength={6} onChange={(e)=>onchangeCode(e.target.value,index)}  value={verifyCode[index]} onKeyDown={(e)=>onKeyPress(e,index)}  />
      })
     }
      {/* <TextInputVerify  value={verifyCode.twoNumber}  onchange={(e)=>setVerifyCode({...verifyCode,twoNumber:e.target.value})}/>       
      <TextInputVerify  value={verifyCode.threeNumber}  onchange={(e)=>setVerifyCode({...verifyCode,threeNumber:e.target.value})}/>       
      <TextInputVerify  value={verifyCode.fourNumber}  onchange={(e)=>setVerifyCode({...verifyCode,fourNumber:e.target.value})}/>       
      <TextInputVerify  value={verifyCode.fiveNumber}  onchange={(e)=>setVerifyCode({...verifyCode,fiveNumber:e.target.value})}/>       
      <TextInputVerify  value={verifyCode.sixNumber}  onchange={(e)=>setVerifyCode({...verifyCode,sixNumber:e.target.value})}/>        */}
      </Box>
         <motion.button   whileHover={{ scale: 1.01 }}
    whileTap={{ scale: 0.9 }} disabled={verifyCode.some((c)=> c == "")} className="button_primary h-[39px]  max-w-[90%] my-8">
          {
        isLoading ? 
        <LiaSpinnerSolid className="mx-auto animate-spin"/>
        :
        <> Verify Email</>
      }
         
        </motion.button>
      

     </form>
    </motion.div>
      
    </AuthLayout>
  )
}

export default Forgotpassword
