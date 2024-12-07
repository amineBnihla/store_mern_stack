import mongoose, { Schema } from "mongoose";




const categorySheme = new Schema({
    name:{
        type:String,
        unique:true,
        required:true
    },
    description:{
          type:String,
        default:null,
    }
},{timestamps:true})

const Category = mongoose.model('Category',categorySheme)

export default Category