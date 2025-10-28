import User from "../models/userModel.js";
import { signinValid, signupValid } from "../zod/userzod.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {v2 as cloudinary}  from 'cloudinary'
import { JWT_TOKEN ,transporter } from "../config.js";
import {v4 as uuidv4 } from 'uuid' ;
import Community from "../models/communityModel.js"
import dotenv from 'dotenv'
dotenv.config()



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
        console.log(err)
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
        console.log(err)
        return res.status(500).json({message : "User Signup Error"})
    }
}

export const Signin = async(req,res)=>{
    const {email,password} = req.body
    const {success} = signinValid.safeParse(req.body)
    if(!success){
        return res.status(400).json({message: "enter valid inputs"})
    }

    try{
        const user = await User.findOne({email})
        if(!user){
            return res.status(404).json({message : "User Not Found"})
        }

        const isPasswordValid = await bcrypt.compare(password,user.password)
        if(!isPasswordValid){
            return res.status(401).json({message : "Invalid Credentials"})
        }

        const userId = user._id

        const token = jwt.sign({userId},JWT_TOKEN,{expiresIn:'1h'})
        return res.status(200).json({message : "Signin Successful", token : token})   
    }catch(err){
        console.log(err)
        return res.status(500).json({message : "Sign in Error "})
    }
}

export const getUserById = async(req,res)=>{
    const userId = req.userId
    try{
        const user = await User.findById(userId)
        if(!user){
            return res.status(404).json({msg : "User not Found"})
        }
        return res.status(200).json({user : user})
    }catch(err){
        console.log(err)
        return res.status(500).json({msg : "Internal Server Error"})
    }
}

export const getUsers = async(req,res)=>{
    const filter = req.query.filter || ""

    let users = await User.find({
            username : {"$regex" : filter, "$options": "i"}
    })
    users = users.filter(user => user._id.toString() !== req.userId)
    return res.status(200).json({user : users.map(user=>({
        _id : user._id,
        username : user.username,
        displayName: user.profile?.displayName 
    }))}) 
}

export const createProfile = async(req,res)=>{

    const {displayName,description} = req.body
    const userId = req.userId
    let avatarUrl,bannerUrl

    try {
        let user = await User.findOne({_id : userId})
        if(!user){
            return res.status(404).json({msg : "user not found"})
        }
        if(req.files?.avatar){
            const result = await  cloudinary.uploader.upload(req.file.avatar)
            avatarUrl = result.secure_url
        }
        if(req.files?.banner){
            const result = await cloudinary.uploader.upload(req.file.banner)
            bannerUrl = result.secure_url
        }
        const profile = user.profile = {
            displayName,description,
            avatar : { 
                exists : avatarUrl ? true : false,
                url  : avatarUrl
            },
            banner :{
                exists : bannerUrl ? true : false,
                url : bannerUrl
            }
        }
        await user.save()
        return res.status(200).json({msg : "Profile Created"})
    }catch(err){
        console.log(err)
        return res.status(500).json({msg : "Internal Server Error"})
    }
}
 
export const followUser = async(req,res)=>{
    const userId = req.userId
    const {followUserId} = req.params
    try{
        const user = await User.findById(userId)
        const followUser = await User.findById(followUserId)
        if(!user || !followUser){
            return res.status(404).json({msg : "User Not Found"})
        }
        if(user.following.includes(followUserId)){
            return res.status(400).json({msg : "Already Following"})
        }
        user.following.push(followUserId)
        followUser.followers.push(userId)
        await user.save()
        await followUser.save()
        return res.status(200).json({msg : "User Followed"}) 
    }catch(err){
        console.log(err)
        return res.status(500).json({msg : "Internal Server Error"})
    }
}

export const unfollowUser = async(req,res)=>{
    const userId = req.userId
    const {unfollowUserId} = req.params
    try{
        const user = await User.findById(userId)
        const unfollowUser = await User.findById(unfollowUserId) 
        if(!user || !unfollowUser){
            return res.status(404).json({msg : "User Not Found"})
        }       
        if( !user.followring.includes(unfollowUserId)){
            return res.status(400).json({msg : "Not Following"})
        }
        user.following = user.following.filter(id => id.toString() !== unfollowUserId)
        unfollowUser.followers = unfollowUser.followers.filter(id => id.toString() !== userId)
        await user.save()
        await unfollowUser.save()
        return res.status(200).json({msg : "User Unfollowed"}) 
    }catch(err){
        console.log(err)
        return res.status(500).json({msg : "Internal Server Error"})
    }

}

export const subscribe = async(req,res)=>{
    const userId = req.userId
    const {communityId} = req.params

    try{
        const community = await Community.findById(communityId)

        if(!community){
            return res.status(404).json({msg : "Community Not Found"})
        }   

        community.subscribers.push(userId)
        community.count.subscribers += 1
        await community.save()

        return res.status(200).json({msg : "Community Followed"}) 
    }catch(err){

        console.log(err)
        return res.status(500).json({msg : "Internal Server Error"})
    }
}


export const unSubscribe = async(req,res)=>{
    const userId = req.userId
    const {communityId} = req.params 

    try{
        const community = await Community.findById(communityId)

        if(!community){
            return res.status(404).json({msg : "User or Community Not Found"})
        }
        if(!community.subscribers.includes(userId)){
            return res.status(400).json({msg : "Not Subscribed"})
        }

        community.subscribers = community.subscribers.filter(id => id.toString() !== userId)
        community.count.subscribers -= 1
        await community.save()

        return res.status(200).json({msg : "Community Unfollowed"}) 
    }catch(err){           

        console.log(err)
        return res.status(500).json({msg : "Internal Server Error"})
    }
}


export const getCommunities = async(req,res)=>{
    const userId = req.userId

    try{
        let communities = await Community.find({
            subscribers : userId
        })
        return res.status(200).json({communities})
    }catch(err){

        console.log(err)
        return res.status(500).json({msg : "Internal Server Error"})
    }
}