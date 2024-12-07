import jwt from 'jsonwebtoken'

 const verifyToken= (req,res,next)=>{

    const token = req.cookies.token

    if(!token) return res.status(400).json({message:"Unauthorized - no token provided",success:false})
    try {
        
const decode = jwt.verify(token,process.env.JWT_SECRET)
if(!decode) return res.status(400).json({message:"Unauthorized - invalid token",success:false})

req.userId = decode.userId
next()
    } catch (error) {
        res.status(400).json({message:`Error : ${error.message}`,success:false})
    }
}
export default verifyToken