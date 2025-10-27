import User from "../models/userModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { signinValid, signupValid } from "../zod/userzod.js";
import { JWT_TOKEN } from "../config.js";
import nodemailer from 'nodemailer';
import cloudinary from 'cloudinary';
import {v4 as uuidv4 } from 'uuid' ;


dotenv.config()

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.EMAIL_USER,
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
  },
});


cloudinary.config({
    cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
    cloud_api : process.env.CLOUDINARY_API_KEY,
    cloud_secret : process.env.CLOUDINARY_API_SECRET
})


export const Verify = async(req,res)=>{
    try{
        const {verificationToken} = req.params
        const user = await User.findOne({verificationToken})

        if(!user){
            return res.status(404).json({msg : "User Not Found"})
        }

        user.verified = true 
        user.verificationToken = null
        await user.save()
        
        return res.status(200).json({msg: "Email Verified"})
    }catch(error) {
        return res.status(500).json({msg: "Nodemailer Error"})
    }
}



export const Signup = async(req,res)=>{

    const{username,email,password} = req.body

    const {success} = signupValid.safeParse(req.body) 
    if(!success){
        return res.status(400).json({message: "enter valid inputs"})
    }

    try{
        let user = await User.findOne({email})
        if(user){
            return res.status(409).json({message : "Email  already exists"})
        }

        const salt = await  bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password,salt)

        user = await User.create({username,email,password:hashPassword})

        const verificationToken = uuidv4()
        user.verificationToken = verificationToken
        await user.save()

        const mailOptions = {
            from : process.env.EMAIL_USER,
            to : user.email,
            subject : "HiveTalk : Email Verification",
            html : `
                  <h3>Verify Your Email</h3>
                  <h3>Click below link to very your email address for HiveTalk</h3>
                  <a href="http://localhost:3000/api/v1/user/verify/${verificationToken}">HiveTalk.com</a>`   
        }
        await transporter.sendMail(mailOptions)

        const userId = user._id

        const token = jwt.sign({userId},JWT_TOKEN,{expiresIn:'1h'})
        return res.status(200).json({message : "user created ",token : token})

    }catch(err){
        return res.status(500).json({message : "Error registering user ",err})
    }
}


export const Signin = (req,res)=>{
    const {email,passsword} = req.body
    const {success} = signinValid.safeParse(req.body)
    if(!success){
        return res.status(400).json({message: "enter valid inputs"})
    }

    try{
        const user = User.findOne({email})
        if(!user){
            return res.status(404).json({message : "User Not Found"})
        }

        const isPasswordValid = bcrypt.compare(password,user.password)
        if(!isPasswordValid){
            return res.status(401).json({message : "Invalid Credentials"})
        }

        const userId = user._id

        const token = jwt.sign({userId},JWT_TOKEN,{expiresIn:'1h'})
        return res.status(200).json({message : "Signin Successful", token : token})   
    }catch(err){
        return res.status(500).json({message : "Error signing in user ",err})
    }
}