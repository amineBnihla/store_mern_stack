import express from 'express'
import dotenv from 'dotenv'
import { connectiondb } from './config/db.js'
import product from './models/product.model.js'
import { mongo } from 'mongoose'
import mongoose from 'mongoose'
import productRouter from './routes/product.route.js'
dotenv.config()
const app = express()
app.use(express.json());
app.use('/api/products',productRouter)
  //bFB99LSTjfVq8epy
app.listen(5000,()=>{
    connectiondb()
    console.log("Server run on 5000")
})