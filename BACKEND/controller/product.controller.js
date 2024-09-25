import product from "../models/product.model.js"

export const getProducts = async (req,res)=>{
   
 try {
     const products = await product.find({})
        res.status(200).json({message:"All Products",success:true,data:products})

 } catch (error) {
        res.status(500).json({message:"Something went wrong",success:false})

 }


}

  
 export const addProducts = async (req,res)=>{
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
      const proexist = await product.findOne({name:data.name}).exec()
      if(proexist){
       return res.status(404).json({message:"Product Exsist already",success:false})

      }
    }
    try {
    const pro = await product.findByIdAndUpdate(id,data)
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