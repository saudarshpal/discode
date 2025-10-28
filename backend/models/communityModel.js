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
      title : {
        type : String,
        required : true,
        maxLength : 50,
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
      subscribers : {
            type : mongoose.Schema.Types.ObjectId,
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
      }   
})

const Community = mongoose.model('Community',communitySchema)

export default Community

