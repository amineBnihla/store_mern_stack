import express from 'express'
import dotenv from 'dotenv'
import { connectiondb } from './config/db.js'
import product from './models/product.model.js'
dotenv.config()
const app = express()


 app.post('/products',async (req,res)=>{
     const data = req.body

    if(data.name == "" || data.price == "" || data.image){
        res.status(401).send({message:"Enter a valid data",success:false})
    }
   const pro = new product(data)

   try {
    await pro.save()
    res.status(200).send({message:"Added with success",success:true})
   } catch (error) {
    res.status(500).send({message:"Something went wrong",success:false})
   }

})

  //bFB99LSTjfVq8epy
app.listen(5000,()=>{
    connectiondb()
    console.log("Server run on 5000")
})