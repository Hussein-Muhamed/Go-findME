const mongoose = require('mongoose')
const messagesSchema = new mongoose.Schema({
    message:{
        type:String,
    },
    uid:{
        type:mongoose.Schema.Types.ObjectID,
        required:true,
        ref:'User'
    },
    owner :{
        type:String,
        ref:'User'
    },
     uavatar: {
        type:String,
        ref:'User'
    }
},{
    timestamps: true
})

const Messages =  mongoose.model('Messages', messagesSchema)
module.exports = Messages
