import mongoose, {Schema} from "mongoose";


const productShema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
  },{
    timestamps:true
  });

  const product = mongoose.model('Product',productShema)

  export default product