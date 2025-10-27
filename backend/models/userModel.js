import mongoose from "mongoose";
import { string } from "zod/v4";


const userSchema = new mongoose.Schema({
    username : {
        type : String,
        unique : true,
        required : true,
        minLength : 5,
        maxLength : 20,
    },
    email : {
        type : String,
        unique : true,
        required : true,       
    },
    password : {
        type : String,
        required : true,
        minLength : 8,
    },
    followers : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'User'
        }
    ],
    following : [
        {
            type : mongoose.Schema.Types.ObjectId,
        }
    ],
    profile : {
        bio :{
            type : String,
            maxLength : 150,
        },
        avatar : {
            exists : {
                type : Boolean,
                default : false
            },
            url : {
                type : String,
                default : null
            }
        }
    },
    verificationToken :{
        type : String
    },
    verified : {
        type : Boolean,
        default : false,
    }

})

const User = mongoose.model('User',userSchema)

export default User