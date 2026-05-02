import mongoose from "mongoose";

const URI = process.env.MONGODB_URI || "";

export default function connectDB(){
    mongoose.connect(URI).then(()=>{
        console.log("database connected")
    }).catch((error)=>{
        console.log("[database connection error] ",error.message)
    })
}