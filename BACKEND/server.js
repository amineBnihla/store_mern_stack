import express from 'express'
import dotenv from 'dotenv'
import { connectiondb } from './config/db.js'
import product from './models/product.model.js'
import { mongo } from 'mongoose'
import mongoose from 'mongoose'
dotenv.config()
const app = express()
app.use(express.json());
app.get('/products',async (req,res)=>{
 try {
     const products = await product.find({})
        res.status(200).json({message:"All Products",success:true,data:products})

 } catch (error) {
        res.status(500).json({message:"Something went wrong",success:false})

 }


})
  
 app.post('/products',async (req,res)=>{
     const data = req.body

    if(data.name == "" || data.price == "" || data.image == ""){
       return res.status(404).json({message:"Enter a valid data",success:false})
    }
    const pro = new product(data)
    const check_exsist = await product.findOne({name:pro.name}).exec()
    if(check_exsist){
       return res.status(404).json({message:"Product Exsist already",success:false})

    }
  
   try {
    await pro.save()
    res.status(200).send({message:"Added with success",success:true})
   } catch (error) {
    res.status(500).json({message:"Something went wrong",success:false})
   }

})
 app.put('/products/:id',async (req,res)=>{
     const data = req.body
     const {id} = req.params

    if(data.name == "" || data.price == "" || data.image == ""){
       return res.status(404).json({message:"All Fields Required",success:false})
    }
    const pro = product.findByIdAndUpdate(id,data)
    const check_exsist = await product.findOne({name:pro.name}).exec()
    if(check_exsist){
       return res.status(404).json({message:"Product Exsist already",success:false})
    }
  
   try {
    await pro.save()
    res.status(200).send({message:"Added with success",success:true})
   } catch (error) {
    res.status(500).json({message:"Something went wrong",success:false})
   }

})
 app.delete('/products/:id',async (req,res)=>{
     const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({message:"Not a valid ID",success:false})
    }
    try {
         await product.findByIdAndDelete(id)
       
    res.status(200).json({message:"Deleted with success",success:true})
   } catch (error) {
    res.status(500).json({message:"Something went wrong",success:false})
   }

})
  //bFB99LSTjfVq8epy
app.listen(5000,()=>{
    connectiondb()
    console.log("Server run on 5000")
})