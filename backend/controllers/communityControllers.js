
import Community from "../models/communityModel.js"
import Post from "../models/postModel.js"
import User from "../models/userModel.js"
import {v2 as cloudinary} from 'cloudinary'

export const getCommunities = async(req,res)=>{
     try{
        let communities = await Community.find({})
        if(!communities){
            return res.status(404).json({msg : "No Communities"})
        }
        return res.status(200).json({communities : communities})
     }catch(err){
        console.log(err)
        return res.status(500).json({msg : "Internal Server error"})
     }
}


export const createCommunity = async(req,res)=>{
    const userId = req.userId
    const {name,description} = req.body
    let communityBannerUrl

    try{
        const user = await User.findById(userId)
        if(!user){
            return res.status(404).json({msg : "User not found"})
        }

        if(req.file){
            const result = await cloudinary.uploader.upload(req.file.path)
            communityBannerUrl = result.secure_url
        }
        const newCommunity = await Community.create({
            name : name,
            description : description,
            admin : userId ,
            banner :{
                exists : communityBannerUrl ? true : false,
                url : communityBannerUrl
            } 
        })
        return res.status(200).json({msg : "Community Created",community : newCommunity})
    }catch(err){
        console.log(err)
        return res.status(500).json({msg:"Internal Server Error"})
    }
}


export const getCommunityById = async(req,res)=>{
    const {communityId} = req.params
    try{
        const community = Community.findById(communityId)
        if(!community){
            return res.status(404).json({msg : "Community not found"})
        }
        return res.status(200).json({community : community})
    }catch(err){
        console.log(err)
        return res.status(500).json({msg : "Internal Server Error"})
    }   
}


export const getcommunityPosts = async(req,res)=>{
    const userID = req.userId
    const {communityId} = req.params
    try{
        const community = await Community.findById(communityId)
        if(!community){
            return res.status(404).json({msg : "Community not found"})
        }
        const posts = await Post.find({community : communityId, author : userId})
        return res.status(200).json({posts : posts})
    }catch(err){
        console.log(err)
        return res.status(500).json({msg : "Internal Server Error"})
    }
}


export const deleteCommunity = async(req,res)=>{
    const {communityId} = req.params       
    try{
        const community = await Community.findByIdAndDelete(communityId)
        if(!community){
            return res.status(404).json({msg : "Community not found"})
        }   
        return res.status(200).json({msg : "Community Deleted"})
    }catch(err){
        console.log(err)
        return res.status(500).json({msg : "Internal Server Error"})
    }   
}

export const addModerator = async(req,res)=>{
    const adminId = userId
    const {communityId} = req.params
    const {moderatorId} = req.params
    try{
        const admin = User.findById(adminId)
        const community = Community.findOne({communityId, admin})
        const moderator = User.findById(moderatorId)
        if( !admin || !moderator || !community){
            return res.status(404).json({msg : "Dosen't Exist"})
        }
        community.moderators.push(moderatorId)
        await community.save()
        return res.status(200).json({msg : "Moderator Added"})
    }catch(err){
        console.log(err)
        return res.status(500).json({msg : "Internal Server Error"})
    }
}
