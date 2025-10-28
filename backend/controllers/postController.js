import Post from "../models/postModel.js"


export const createPost = async(req,res)=>{
    const userID = req.userId
    const{title,content} = req.body
    try{
        let user = await  User.findById(userID)
        if(!user){
            return res.status(400).json({msg:"user not found"})
        }
        await Post.create({
            title,content, author : userId
        })
        return res.status(200).json({msg : "Post Created"})
    }catch(err){
        console.log(err)
        return res.status(500).json({msg:"Internal server error"})
    }
}


