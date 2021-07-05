const express = require('express')
const router = express.Router()
const User = require('../models/user')
const auth = require('../middleware/auth')
const { response } = require('express')
const {sendWelcomeEmail, sendCancelationEmail, resetPassword} = require('../emails/account')
const multer = require('multer')
const path = require('path')
const { upload, deleteImage } = require("../utils/index");

// uplod user photo
router.post('/users/me/avatar',auth , upload , async (req, res)=>{
    var img = req.file.path.replace(`src\\public\\`, '');
    console.log(img)
    // const imagepath = req.file.path.replace("src","")
     req.user.avatar = img;
     const user = await req.user.save()
    res.status(200).send(user)
}, (error, req, res, next)=>{
    res.status(400).send({error:error.message})
})
// delet user photo
router.delete('/users/me/avatar',auth , async (req, res)=>{
    req.user.avatar = undefined
    await req.user.save()
    res.send()
})
//show user photo
router.get('/users/me/avatar', auth , async (req, res)=>{
    try{
        // const user = await User.findById(req.params.id)
        if(!user || !user.avatar){
          throw new Error()  
        } 
        
        res.set('Content-Type','image/jpg')
        res.send(user.avatar)
    } catch(e) {
        res.status(400).send()
    }
})

// not worked
router.post('/users/usrename', async(req, res)=>{
    try{
        const users = await User.findOne({userName: req.body })
        res.status(200).send(users)
    } catch (e) {
        res.status(400).send(e)
    }
})

//create user 
router.post('/users', async (req, res)=>{
    const user =  new User(req.body)
    try{
        await user.save() 
        sendWelcomeEmail(user.email, user.userName)
        const token = await user.generateAuthtoken()
        res.status(201).send({user, token})
    } catch (e){
        res.status(400).send(e)
    }
})


// forget password
router.post('/forgetpassword', async (req, res)=>{
    try{
    const rnumber = Math.random() * (100000000 - 100000) + 100000
    const password2 = Math.ceil(rnumber)
    const user = await User.findOneAndUpdate({email:req.body.email},{password:password2})
    if(!user)
        return res.status(404).send()
        resetPassword(user.email, user.username, password2)
    // await user.save()
        console.log(password2)
        res.status(200).send("Please Check Your Mail, We send new Password to you")
    } catch(e){
        console.log(e)
        res.status(400).send(e)
    }
})


// login 
router.post('/users/login',  async (req, res)=>{
    try{
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthtoken()
        res.send({user, token})
    } catch (e){
        res.status(400).send()
    }
})


// read profile
router.get('/users/me', auth, async (req, res)=>{
    res.send(req.user)
})

// read all profile
router.get('/users/profiles', async (req, res)=>{
    try{
      const user = await User.find({})  
      res.status(200).send(user)
    } 
    catch (e){
        res.status(500).send(e)
    }
})

//logout
router.post('/users/logout', auth , async (req, res)=>{
    try{
        req.user.tokens = req.user.tokens.filter((token)=>{ 
            return token.token !== req.token
        })
        await req.user.save()
        res.send()
    } catch (e){
        res.status(500).send() 
    }
})
// delete account 
router.delete('/users/me', auth , async (req, res)=>{
    try{
       const user = await req.user.remove()
        sendCancelationEmail(user.email, user.userName)
        res.status(200).send(user)
    } catch (e){
        res.status(400).send(e)
    }
})
// update information 
router.patch('/users/me', auth ,async (req, res)=>{
    const update = Object.keys(req.body)
    const allowupdate =['userName', 'email', 'phoneNumber','password']
    const isValidOperation = update.every((update)=>allowupdate.includes(update))

    if(!isValidOperation)
        return res.status(400).send({error:'Invalid update'})
    try{
        // const user = await User.findByIdAndUpdate(req.params.id)
        
        update.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()
        res.send(req.user)
        
    } catch (e){
        res.status(400).send(e)
    }
})

router.patch('/users/:id', async (req, res)=>{
    const update = Object.keys(req.body)
    const allowupdate = ['password']
    const isValidOperation = update.every((update)=>allowupdate.includes(update))
    if(!isValidOperation)
        return res.status(400).send({send:'Invalid update'})
    try{
        const user = await User.findByIdAndUpdate(req.params.id)
        update.forEach((update) => user[update] = req.body[update])
        if(!user)
            return res.status(404).send()
        await user.save()
        res.status(200).send(user)
    } catch(e) {
        res.status(400).send(e)
    }
})

module.exports = router