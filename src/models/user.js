const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    fname:{
        type: String,
        required: true,
    }, lname:{
        type: String,
        required: true,
    }, email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value))
                throw new error('email is unvalid')
        }
    }, password:{
        type: String,
        minLength: 7,
        required: true,
    }, age:{
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a postive number')
            }
        }
    }, phoneNumber:{
        type: String,
        length:11
    },gender:{
        type:String,
        require: true,
    }
})

// to hash the password 
userSchema.pre('save',async function(next) {
    const user = this 
    if(user.isModified('password'))
        user.password = await bcrypt.hash(user.password, 8)
    next()
})

// login check
userSchema.statics.findByCredentials = async (email, password) =>{
    const user = await User.findOne({email})
    if(!user)
        throw new Error('Uncorrect email')
    const ismatch = await bcrypt.compare(password, user.password)
    if(!ismatch)
        throw new Error('Uncorrect password')
    return user
}

const User = mongoose.model('Users', userSchema)

module.exports = User