import mongoose from "mongoose"

export const connectiondb = async ()=>{
try {
    console.log(process.env.MONGO_URL)
    const conn = await mongoose.connect(process.env.MONGO_URL)
    console.log('Connected with Database : '+ conn.connection.host)
} catch (error) {
    console.log('not connected to database')
    process.exit(1)
}
}

 