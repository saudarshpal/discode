import Community from "../models/communityModel.js"
import Post from "../models/postModel.js"
import User from "../models/userModel.js"



export const createPost = async(req,res)=>{
    let postImages = []
    const userId = req.userId
    const {title,content,communityName} = req.body
    console.log("Post data received:", { title, content, communityName });
    try{
        let user = await User.findById(userId) 
        let community = await Community.findOne({
            name : communityName
        })
        if(!user || !community){
            return res.status(404).json({
                msg:"User/Community not found"
            })
        }
        if(req.files && req.files.length > 0){
            postImages = req.files.map(image => ({
                url : image.path,
                public_id : image.filename
            }))
        }
        await Post.create({
            title,
            content,
            images : postImages,
            author : userId,
            community : community._id
        })
        return res.status(200).json({
            msg : "Post Created"
        })
    }catch(err){
        console.log(err)
        return res.status(500).json({
            msg:"Internal server error"
        })
    }
}

export const deletePost = async(req,res)=>{ 
    const userId = req.userId
    const {postId} = req.params 
    try{
        let post = await Post.findById(postId)
        if(!post){
            return res.status(404).json({
                msg : "Post not found"
            })
        }   
        if(post.author.toString() !== userId){
            return res.status(403).json({
                msg : "Unauthorized "
            })
        }       
        await Post.findByIdAndDelete(postId)
        return res.status(200).json({
            msg : "Post Deleted Successfully"
        })
    }catch(err){
        console.log(err)
        return res.status(500).json({       
            msg : "Internal Server Error"
        })
    }   
}

export const getPostById = async(req,res)=>{
    const {postId} = req.params 
    try{        
        let post = await Post.findById(postId)
        if(!post){
            return res.status(404).json({   
                msg : "Post not found"
            })
        }
        return res.status(200).json({
            post
        })
    }catch(err){
        console.log(err)
        return res.status(500).json({       
            msg : "Internal Server Error"
        })
    }
}

export const getAllPosts = async(req,res)=>{
    try{
        let posts = await Post.find() 
        return res.status(200).json({
            posts
        })      
    }catch(err){
        console.log(err)
        return res.status(500).json({   
            msg : "Internal Server Error"
        })          
    }
}

export const getYourPosts = async(req,res)=>{
    const userId = req.userId
    try{
        let posts = await Post.find({
             author : userId
            })
        return res.status(200).json({
            posts
        })      
    }catch(err){
        console.log(err)
        return res.status(500).json({   
            msg : "Internal Server Error"
        })          
    }
}

export const voteOnPost = async(req,res)=>{
    const {postId} = req.params
    const {voteType} = req.body
    try{
       let post = await Post.findById(postId)
       if(!post){
            return res.status(404).json({
                msg : "Invalid Posts"
           })
        }
        if(voteType === "upvote"){
            post.votes.upvotes++;
        } 
        else if(voteType === "downvote"){
            post.votes.downvotes++;
        }
        else if(voteType === "unvote"){
            if(req.body.voteType === 'upvote' && post.votes.upvotes > 0){
                post.votes.upvotes--;
            }
            else if(req.body.voteType === 'downvote' && post.votes.downvotes > 0){
                post.votes.downvotes--;
            }
        } 
        await post.save() 
        return res.status(200).json({
            msg : "Voted Successfully"
        })    
    }catch(err){
        console.log(err)
        return res.status(500).json({
            msg:"Internal server error"
        })
    } 
}

export const commentOnPost = async(req,res)=>{
    const userId = req.userId
    const {postId} = req.params
    const {content} = req.body
    try{
        let post = await Post.findById(postId)
        if(!post){
            return res.status(404).json({
                msg : "Post not found"
            })
        }
        post.comments.push({
            author : userId,
            content
        })
        await post.save()
        return res.status(200).json({
            msg : "comment Added"
        })
    }catch(err){
        console.log(err)
        return res.status(500).json({
            msg : "Internal Server Error"
        })
    }
}

export const getAllcomments = async(req,res)=>{
    const {postId} = req.params
    try{
        let post = await Post.findById(postId)
        if(!post){
            return res.status(404).json({
                msg : "Post not found"
            })
        }           
        return res.status(200).json({
            comments : post.comments
        })
    }catch(err){            
        console.log(err)
        return res.status(500).json({
            msg : "Internal Server Error"
        })
    }   
}

export const deleteComment = async(req,res)=>{
    const userId = req.userId
    const {postId,commentId} = req.params
    try{                        
        let post = await Post.findById(postId)
        if(!post){
            return res.status(404).json({   
                msg : "Post not found"
            })
        }
        let comment = post.comments.find(comment => comment._id.toString() === commentId)
        if(!comment){
            return res.status(404).json({       
                msg : "Comment not found"
            })
        }
        if(comment.author.toString() !== userId){
            return res.status(403).json({
                msg : "Unauthorized "
            })
        }
        post.comments = post.comments.filter(comment => comment._id.toString() !== commentId)
        await post.save()
        return res.status(200).json({
            msg : "Comment Deleted Successfully"
        })
    }catch(err){
        console.log(err)
        return res.status(500).json({   
            msg : "Internal Server Error"
        })
    }   
}

export const voteOnComment = async(req,res)=>{
    const {postId,commentId} = req.params
    const {voteType} = req.body
    try{
        let post = await Post.findById(postId)
        if(!post){
            return res.status(404).json({
                msg : "Invalid Post"
            })
        }
        let comment = post.comments.find(comment => comment._id.toString() === commentId)
        
        if(!comment){
            return res.status(404).json({
                msg : "Invalid Comment"
            })
        }
        if(voteType === "upvote" ){
            comment.votes.upvotes++;
        }
        else if(voteType === "downvote"){
            comment.votes.downvotes++;
        }
        else if(voteType === "unvote"){
            if(req.body.voteType === 'upvote' && comment.votes.upvotes > 0){
                comment.votes.upvotes--;
            }
            else if(req.body.voteType === 'downvote' && comment.votes.downvotes > 0){
                comment.votes.downvotes--;
            }
        } 
        console.log(comment.votes)
        await post.save()
        return res.status(200).json({
            msg : "Voted on comment"
        })
    }catch(err){
        console.log(err)
        return res.status(500).json({
            msg : "Internal Server Error"
        })
    }
}




