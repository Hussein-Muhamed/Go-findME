const mongoose = require('mongoose')
const validator = require('validator')


const tpeopleSchema = new mongoose.Schema({
    fname:{
        type:String,
        required:true
    }, lname:{
        type:String,
        required:true
    }, email:{
        type:String,
        required:true,
        unique:true,
        validate(value){
          if(!validator.isEmail(value))
            throw new Error('Un correct email, please check your email')  
        }
    }, phoneNumber:{
        type:String,
        unique:true,
        validate(value){
            if(!validator.isMobilePhone(value,'ar-EG'))
                throw new Error('Uncorrect phone number')
        }
    }, gender:{
        type:String,
        required:true
    },owner:{
        type:mongoose.Schema.Types.ObjectID,
        required:true,
        ref:'User'
    }
})

const Trusted =  mongoose.model('Trusted',tpeopleSchema)

module.exports = Trusted
