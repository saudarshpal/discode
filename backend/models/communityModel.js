import mongoose from "mongoose";


const communitySchema = new mongoose.Schema({
      name : {
        type :String,
        required : true,
        unique : true,
        maxLength : 30
      },
      admin :{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
      },
      moderators : {
        type : [mongoose.Schema.Types.ObjectId],
        ref : 'User'
      },
      description : {
        type : String,
        required : true 
      },
      created : {
        type : Date,
        default : Date.now(),
        immutable : true
      },
      posts : {
            type : [mongoose.Schema.Types.ObjectId],
            ref : 'Post'
      },
      subscribers : {
            type : [mongoose.Schema.Types.ObjectId],
            ref : 'User'
      },
      count : {
            subscribers :{
                type : Number,
                default : 0,
            },
            posts : {
                type :Number,
                default : 0,
            }
      },
      banner:{
            exists: {
                type : Boolean,
                default : false
            },
            url : {
                type : String,
                default : null
            }
        } 
})

const Community = mongoose.model('Community',communitySchema)

export default Community

