import mongoose from "mongoose"
import product from "../models/product.model.js"

export const getProducts = async (req,res)=>{
   
//   return res.status(200).json({message:"All Products",success:true,data:"hello"})
 try {
     const products = await product.find({}).populate('category','_id').populate('category','name').exec()
     res.status(200).json({message:"All Products",success:true,data:products})
     

 } catch (error) {
        res.status(500).json({message:"Something went wrong",success:false})

 }


}

  
 export const addProducts = async (req,res)=>{
     const data = req.body

   //   return res.status(200).json({message:"Enter a valid data",data:data})
    if(data.name == "" || data.price == "" || data.image == "" || data.category == ""){
       return res.status(404).json({message:"Enter a valid data",success:false})
    }
    const pro = new product(data)
    const check_exsist = await product.findOne({name:{'$regex': pro.name,$options:'i'}}).exec()
    if(check_exsist){
       return res.status(404).json({message:"Product Exsist already",success:false})

    }
  
   try {
    await pro.save()
   //  const prod = await product.findById(id)
    res.status(200).send({message:"Added with success",success:true,data:pro})
   } catch (error) {
    res.status(500).json({message:"Something went wrong",success:false})
   }

}

 export const updateProducts =async (req,res)=>{
     const data = req.body
     const {id} = req.params     
        if(!mongoose.Types.ObjectId.isValid(id)){
           return res.status(404).json({message:"Not a valid ID",success:false})
         }
 
    if(data.name == "" || data.price == "" || data.image == ""){
       return res.status(404).json({message:"All Fields Required",success:false})
    }
    const procheck = await product.findOne({_id:id}).exec()
    if(procheck.name != data.name){
      const proexist = await product.findOne({name:{'$regex': data.name,$options:'i'}}).exec()
      if(proexist){
       return res.status(404).json({message:"Product Exsist already",success:false})

      }
    }
    try {
    const pro = await product.findByIdAndUpdate(id,data,{
  new: true
})
    
    res.status(200).send({message:"Updated with success",success:true,data:pro})
   } catch (error) {
    res.status(500).json({message:"Something went wrong",success:false})
   }

}

 export const deleteProducts = async (req,res)=>{
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

}