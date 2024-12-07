
import { Router } from "express";
import { checkUser,resetPassword,forgetPassword, Login, Logout, SignUp, verifyUser } from "../controller/auth.controller.js";
import verifyToken from '../middleware/verifyToken.js'
const router = Router()

router.get('/verify-user',verifyToken,checkUser)
router.post('/signup',SignUp)
router.post('/login',Login)
router.post('/logout',Logout)
router.post('/verify_user',verifyUser)
router.post('/forget-password',forgetPassword)
router.post('/reset-password/:token',resetPassword)

export default router