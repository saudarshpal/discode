import mongoose from "mongoose";


const postSchema  = new mongoose.Schema({
    title :{
        type : String,
        required : true
    },
    content :{
        type : String ,
        required : true
    },
    images : {
        type :[{
            url : String,
            public_id : String
        }
        ],
        default :[]
    },
    author :{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    community : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Community'
    },
    votes : {
        upvotes : {
            type : Number,
            default : 0
        },
        downvotes : {
            type : Number,
            default : 0
        }
    },
    comments : [
        {
            author : {
                type : mongoose.Schema.Types.ObjectId,
                ref : 'User',
                required : true
            },
            content : {
                type : String,
                required : true,
            },
            votes : {
                upvotes : {
                    type : Number,
                    default : 0
                },
                downvotes : {
                    type : Number,
                    default : 0
                }
            }
        }
    ]   
})


const Post = mongoose.model('Post',postSchema)

export default Post 