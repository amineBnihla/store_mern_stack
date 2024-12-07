import mongoose from "mongoose"
import category from "../models/category.model.js"

export const getCategories = async (req,res)=>{
   
 try {
     const categories = await category.find({})
        res.status(200).json({message:"All Categories",success:true,data:categories})

 } catch (error) {
        res.status(500).json({message:"Something went wrong",success:false})

 }


}

  
 export const addCategory = async (req,res)=>{
     const data = req.body
   //   return res.status(404).json({message:"Enter a valid Name",data:data})

    if(data.name == "" ){
       return res.status(404).json({message:"Enter a valid Name",success:false})
    }
    const cat = new category(data)
    const check_exsist = await category.findOne({name:cat.name}).exec()
    if(check_exsist){
       return res.status(404).json({message:"Category Exsist already",success:false})
    }
  
   try {
    await cat.save()
    
   //  const prod = await product.findById(id)
    res.status(200).json({message:"Added with success",success:true,data:cat})
   } catch (error) {
    res.status(500).json({message:"Something went wrong",success:false})
   }

}

 export const updateCategory =async (req,res)=>{
     const data = req.body
     const {id} = req.params     
        if(!mongoose.Types.ObjectId.isValid(id)){
           return res.status(404).json({message:"Not a valid ID",success:false})
         }
 
    if(data.name == ""){
       return res.status(404).json({message:"Name is required",success:false})
    }
    const catcheck = await category.findOne({_id:id}).exec()
    if(catcheck.name != data.name){
      const catexist = await category.findOne({name:{'$regex': data.name,$options:'i'}}).exec()
      if(catexist){
       return res.status(404).json({message:"Category Exsist already",success:false})

      }
    }
    try {
    const cat = await category.findByIdAndUpdate(id,data,{
  new: true
})
    
    res.status(200).json({message:"Updated with success",success:true,data:cat})
   } catch (error) {
    res.status(500).json({message:"Something went wrong",success:false})
   }

}

 export const deleteCategory = async (req,res)=>{
     const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({message:"Not a valid ID",success:false})
    }
    try {
         await category.findByIdAndDelete(id)
       
    res.status(200).json({message:"Deleted with success",success:true})
   } catch (error) {
    res.status(500).json({message:"Something went wrong",success:false})
   }

}