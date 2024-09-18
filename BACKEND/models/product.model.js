import mongoose, {Schema} from "mongoose";


const productShema = new Schema({
    name: {
        type: String,
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

  const product = mongoose.model('Peoduct',productShema)

  export default product