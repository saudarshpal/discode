import mongoose from 'mongoose';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv'
import multer from 'multer';    
dotenv.config()

//connect to database
export const connectToDB = async()=>{
    try{
        const connect = await mongoose.connect(process.env.MONGODB_URL)
        console.log(`MongoDB Connected : ${connect.connection.host}`)
    }catch(err){
        console.log("Error Connecting To DataBase",err)
        process.exit(1)
    }
}

const PORT_NO = process.env.PORT
const JWT_TOKEN = process.env.JWT_SECRET
export {
    PORT_NO ,
    JWT_TOKEN
}

//nodemailer config
export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.EMAIL_USER,
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
  },
});



//multer config 
export const upload = multer({dest : 'uploads/'})











