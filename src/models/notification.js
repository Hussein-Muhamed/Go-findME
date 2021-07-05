const mongoose = require('mongoose')
const notificationSchema = new mongoose.Schema({
    title:{
        type: String,
    }, body:{
        type: String,
    }, uid:{
        type:mongoose.Schema.Types.ObjectID,
        required:true,
        ref:'User'
    }
},{
    timestamps: true
})

const Notification =  mongoose.model('Notification', notificationSchema)
module.exports = Notification