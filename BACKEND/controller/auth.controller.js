import {User} from "../models/user.model.js"
import bcrypt from "bcryptjs"
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookies.js"
import {  resetPasswordSuccessEmail,resetPasswordEmail, sendVerificationEmail,sendWelcomeEmail } from "../mailtrap/emails.js"
import CryptoJS from "crypto-js"
export const SignUp = async (req,res)=>{
 const {email,password,name} = req.body
try {
   
   if(email == "" || password == "" ||  name == ""){
      return res.status(400).json({message:"Fill all inputs"})
  }
  const userExsiste = await User.findOne({email}).exec()
  if(userExsiste){
      return res.status(400).json({message:"User already exists"})
   }
  
   const hashPassword  = await bcrypt.hash(password,10)
   const verificationToken  =  Math.floor(100000 + Math.random()*900000).toString()
   const user = new User({
      email,
      password:hashPassword,
      name,
      verificationToken,
      verificationTokenExpiresAt:Date.now() + 24 * 60 * 60 * 1000
   })
   
   await user.save()
   generateTokenAndSetCookie(res,user._id)
  
   await sendVerificationEmail(user.email,verificationToken)
  
    res.status(200).json({message:'User Added successfuly',user:{
     ...user._doc,
     password:null
   }})
   
} catch (error) {
    res.status(400).json({success:false,message:error.message})
}

}
export const Login = async (req,res)=>{
const {email,password} = req.body

if(email == "" && password == ""){
 return res.status(400).json({success:false,message:"Email and password are required",})
}
try{
const user = await User.findOne({email})
if(!user){
   return res.status(400).json({success:false,message:"Email is Incorrect"})
}
const passwordCheck = await bcrypt.compare(password,user.password)
if(!passwordCheck){
   return res.status(400).json({success:false,message:"Password is Incorrect"})
}

user.lastLogin = Date.now()
await user.save()
generateTokenAndSetCookie(res,user._id)

res.status(200).json({success:false,user:{...user._doc,password:null},message:"user logged in successfuly!"})
} catch (error) {
    res.status(400).json({success:false,message:error.message})
}
}
export const verifyUser = async (req,res)=>{
const {code} = req.body
try {
   
   const user = await User.findOne({ verificationToken :code,
       verificationTokenExpiresAt:{$gt:Date.now()}}).exec()
       console.log(user)
       if(!user){
        return res.status(400).json({success:false,message:"Code is invalid or expired",})
       }
     
       user.isVerified = true
       user.verificationToken = null
       user.verificationTokenExpiresAt = null
      await user.save()
       await sendWelcomeEmail(user.email,user.email)

       res.status(200).json({success:true,data:{
         ...user._doc,
         password:null
       }})
} catch (error) {
   res.status(400).json({success:false,message:"Error message :"+error})
}


}
export const Logout = (req,res)=>{

   res.clearCookie('token')
   res.status(200).json({succcess:true,message:'user logout successfuly'})

}

export const forgetPassword = async(req,res)=>{
const {email} = req.body
try {
   
   const user = await User.findOne({email})
   if(!user){
  return res.status(400).json({success:false,message:"Enter a valid email"}) 
   }
   let resetToken = CryptoJS.SHA1(Math.random()*20).toString(CryptoJS.enc.Hex);
   let resetTokenExpiredDate = Date.now() + 1 * 60 * 60 * 1000

   
   user.resetPasswordToken = resetToken
   user.resetPasswordExpiresAt = resetTokenExpiredDate
   await user.save()
   await resetPasswordEmail(user.email,`${process.env.CLIENT_URI}/reset-password/${resetToken}`)

   res.status(200).json({success:true,message:'Reset Password'})


} catch (error) {
      res.status(400).json({success:false,message:error.message})

}
}
export const resetPassword = async(req,res)=>{
   const resetPasswordToken = req.params.token
const {password,confirmationPassword} = req.body
try {
   
   const user = await User.findOne({resetPasswordToken,resetPasswordExpiresAt:{$gt:Date.now()}})
   if(!user){
      return res.status(400).json({success:false,message:"Reset Password Token is expired or invalid"}) 
   }
//    const passwordCheck = await User.findOne({password})
// if(passwordCheck){
//       return res.status(400).json({success:false,message:"Change Your Last Password"}) 
//    }
   if(password != confirmationPassword){
      return res.status(400).json({success:false,message:"Confirmation Password Should Match With Password"}) 
   }
   const hashPassword = await bcrypt.hash(password,10)
   user.resetPasswordToken = undefined 
   user.resetPasswordExpiresAt = null
   user.password = hashPassword
   await user.save()
   await resetPasswordSuccessEmail(user.email)

   res.status(200).json({success:true,message:'Reset Password Successfuly'})


} catch (error) {
      res.status(400).json({success:false,message:error.message})

}
}

export const checkUser = async(req,res)=>{
   
   try {
       const user = await User.findById(req.userId).select("-password")
       if(!user) return res.status(400).json({message:"User Not Found",success:false})
      res.status(200).json({user,success:true})
   } catch (error) {
       res.status(400).json({success:false,message:error.message})

   }
}