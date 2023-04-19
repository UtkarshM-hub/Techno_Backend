const mongoose=require('mongoose')
const User=require('./User')
const comment = new mongoose.Schema(
    {
        commentAuthor:
        {
            type:mongoose.Types.ObjectId,
            // type:String,
            ref:User,
            required:true
        },
        commentText:{
            type:String,
            required:true
        },
        commentDate:{
            type:String,
            default:Date.now
        },
        
    }
)
const Comment=mongoose.model('Comment',comment)
module.exports=Comment