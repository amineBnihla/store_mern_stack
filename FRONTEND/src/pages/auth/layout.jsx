import {motion} from 'framer-motion'
// import { Box } from "@mui/material"

const AuthLayout = ({children})=>{
   
    return(
     <div  style={{background:"linear-gradient(to bottom right,#111927,#134F2D, #06392A)",position:"relative",height:"100vh",display:"flex",justifyContent:"center",overflow:'hidden',alignItems:"center"}}>
     <motion.div animate={{ x: ["0%","60%","0%"],y: ["0%","60%","0%"],rotate:[0,360] }} 
            transition = {{ ease: "linear",repeat:Infinity, duration: 20,delay:0 }}  className="bg-[#165935] absolute left-[10%] top-[5%] rounded-full size-[180px] blur-[15px]">
     </motion.div>
     <motion.div animate={{ x: ["0%","60%","0%"],y: ["0%","30%","0%"],rotate:[0,360] }} 
            transition = {{ ease: "linear",repeat:Infinity, duration: 20,delay:2 }}  className="bg-[#165935] absolute right-[10%] bottom-[10%] rounded-full size-[100px] blur-[15px]" >
     </motion.div>
     {children}
     </div>
    )

}
export default AuthLayout