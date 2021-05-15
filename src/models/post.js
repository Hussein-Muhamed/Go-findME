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
    }, completed:{
        type:Boolean,
        required:true
    }
    , region :{
        type:String,
        required: true,
        trim: true,
    }, gender :{
        type:String,
        required:true
    }, owner:{
        type:mongoose.Schema.Types.ObjectID,
        required:true,
        ref:'User'
    }
}, {
    timestamps: true
})

const Post = new mongoose.model('Post',postSchema)
module.exports = Post