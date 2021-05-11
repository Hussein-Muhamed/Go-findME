const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    description:{
        type:String,
        required: true,
    }, date:{
        type: String,
        lastActiveAt: Date,
        required: true,
    }, typeofperson :{
        type:String,
        required: true,
    }, city :{
        type:String,
        required: true,
        trim: true,
    }, region :{
        type:String,
        required: true,
        trim: true,
    }, gender :{
        type:String,
        required:true
    }
})

const Post = new mongoose.model('Post',postSchema)
module.exports = Post