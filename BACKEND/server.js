import express from 'express'
import dotenv from 'dotenv'
import { connectiondb } from './config/db.js'
// import product from './models/product.model.js'
// import category from './models/category.model.js'
import productRouter from './routes/product.route.js'
import categoryRouter from './routes/category.route.js'
import cors from 'cors'
import AuthRouter from './routes/auth.router.js'
import cookieParser from "cookie-parser";
import verifyToken from './middleware/verifyToken.js'
import path from "path"
dotenv.config()
const app = express()
const __dirname = path.resolve()
app.use(cors({origin:['http://localhost:5173','http://localhost:4173'],credentials:true}))
app.use(express.json());
app.use(cookieParser())
const port = process.env.PORT || 5000
app.use('/api/products',verifyToken,productRouter)
app.use('/api/categories',verifyToken,categoryRouter)
app.use('/api/auth',AuthRouter)
  //bFB99LSTjfVq8epy

  if(process.env.NODE_ENV.trim() === "production"){
    app.use(express.static(path.join(__dirname,"/FRONTEND/dist")))
    app.get('*',(req,res)=>{
      res.sendFile(path.join(__dirname,"FRONTEND","dist","index.html"))
    })
  }
app.listen(port,()=>{
    connectiondb()
    console.log("Server run on 5000")
})