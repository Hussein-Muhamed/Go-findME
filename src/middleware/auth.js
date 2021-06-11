const jwt = require('jsonwebtoken')
const User = require('../models/user')
// const mailgun = require('mailgun-js')
// const DOMAIN = 'sandbox64b76666bf1646c6b4a7746c5fe355e5.mailgun.org'
// const mg =mailgun({apiKey: process.env.MAIL_API_KEY, domain: DOMAIN})


const auth = async (req, res, next)=>{
    try{    
        const token = req.header('Authorization').replace('Bearer ','')
        const decode = jwt.verify(token,process.env.JWT_SECRET_KEY)
        const user = await User.findOne({ _id: decode._id, 'tokens.token':token})
        if(!user){
            throw new Error()
        }
        req.token = token
        req.user = user
        next()
    } catch(e) {
        res.status(401).send({error : 'Please authenticate'})
    }
}

// const forgetPassword = (req, res) => {
//     const {email} = req.body
//     User.findOne({email}, (err, user)=>{
//         if(err || !user)
//             return res.status(400).json({error:"User with this account not exists"})
//         const token = jwt.sign({_id: user._id}, process.env.RESET_PASSWORD_KEY)
//         const data = {
//             from:'gofindmeapplication@gmail.com',
//             to: email,
//             subject: 'Account reset password link',
//             html:`
//                 <h2> Please click on this link to reset your password<h2>
//                 <p>${process.env.Client_URL}/resetpassword/${token}<p>
//             `
//         }
//         return user.updateOne({resetLink:token}, function(err, succsess){
//             if(err)
//                 return res.status(400).json({error:'reset password link error'})
//             else { 
//                 mg.messages().send(data, function(err, body) {
//                 if(err){
//                     return res.json({
//                         error: err.message
//                     })
//                 }
//                 return res.json({message:'Email has been sent, follow the instructions'})   
//             })
//         }
//         })
//     })
// }

module.exports =  auth