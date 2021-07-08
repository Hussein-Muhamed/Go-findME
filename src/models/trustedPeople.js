const mongoose = require('mongoose')
const validator = require('validator')


const tpeopleSchema = new mongoose.Schema({
    Name:{
        type:String
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
    }, owner:{
        // type:mongoose.Schema.Types.ObjectID,
        type:String,
        required:true,
        ref:'User'
    }, address:{
        type:String
    }
})

const Trusted =  mongoose.model('Trusted',tpeopleSchema)

module.exports = Trusted
