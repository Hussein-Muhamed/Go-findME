const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    userName:{
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
    }, birthdate:{
        type: String,
        default: 0,
        lastActiveAt: true
    }, phoneNumber:{
        type: String,
        unique: true,
        minLength:11,
        maxLength:11,
        validate(value){
            if(!validator.isInt(value))
                throw new Error('phone number is only number')
        }, validate(value){
            if(!validator.isMobilePhone(value,'ar-EG'))
                throw new Error('check your phone number')
        }
    },gender:{
        type:String,
        require: true,
    }, avatar:{
        type:String,
        default:null,
    },
     tokens:[{
        token:{
            type: String,
            required: true,
        }
    }],
    avatar:{
        type:String,
    }
},{
    timestamps:true
})
//to create virtual proparty
userSchema.virtual('trusted',{
    ref:'Trusted',
    localField:'userName',
    foreignField:'owner'
})

//to create virtual proparty
userSchema.virtual('posts',{
    ref:'Post',
    localField:'_id',
    foreignField:'owner'
})

//to create virtual proparty
userSchema.virtual('messages',{
    ref:'messages',
    localField:'_id',
    foreignField:'uid'
})
//to create virtual proparty
userSchema.virtual('messages',{
    ref:'messages',
    localField:'userName',
    foreignField:'owner'
})
//to create virtual proparty
userSchema.virtual('messages',{
    ref:'messages',
    localField:'avatar',
    foreignField:'uavatar'
})
//to create virtual proparty
userSchema.virtual('notification',{
    ref:'notification',
    localField:'_id',
    foreignField:'uid'
})

// to create auth token 
userSchema.methods.generateAuthtoken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() },process.env.JWT_SECRET_KEY)
    // res.send({user, token})
    user.tokens = user.tokens.concat({ token })
    await  user.save()
    return token
}

// to hash the password 
// userSchema.pre('save',async function(next) {
//     const user = this 
//     if(user.isModified('password'))
//         user.password = await bcrypt.hash(user.password, 8)
//     next()
// })

// login check
userSchema.statics.findByCredentials = async (email, password) =>{
    const user = await User.findOne({email})
    if(!user) {
        throw new Error('Uncorrect email')
    }
    // const ismatch = await bcrypt.compare(password, user.password)
    const ismatch = password === user.password
    if(!ismatch)
        throw new Error('Uncorrect password')
    return user
}

const User = mongoose.model('User', userSchema)

module.exports = User