const express = require('express')
const router = express.Router()
const User = require('../models/user')
const auth = require('../middleware/auth')
const { response } = require('express')
const {sendWelcomeEmail, sendCancelationEmail} = require('../emails/account')
const multer = require('multer')

const upload = multer({
    limits:{
        fileSize:1000000
    },
    fileFilter(req, file, cb){
        if (!file.originalname.match(/\.(jpg|png|jpeg)$/))
            return cb(new Error ('please upload image'))
        cb(undefined, true)
    }
})

router.post('/users/me/avatar', auth , upload.single('avatar'), async (req, res)=>{
     req.user.avatar = req.file.buffer
     await req.user.save()
    res.status(200).send()
}, (error, req, res, next)=>{
    res.status(400).send({error:error.message})
})

router.delete('/users/me/avatar',auth , async (req, res)=>{
    req.user.avatar = undefined
    await req.user.save()
    res.send()
})

router.get('/users/:id/avatar',async (req, res)=>{
    try{
        const user = await User.findById(req.params.id)
        if(!user || !user.avatar){
          throw new Error()  
        } 
        res.set('Content-Type','image/jpg')
        res.send(user.avatar)
    } catch(e) {
        res.status(400).send()
    }
})

router.post('/users', async (req, res)=>{
    const user =  new User(req.body)
    try{
        await user.save()
        const token = await user.generateAuthtoken()
        res.status(201).send({user, token})
    } catch (e){
        res.status(400).send(e)
    }
})

router.post('/users/login', async (req, res)=>{
    try{
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthtoken()
        res.send({user, token})
        console.log('uncorret')
    } catch (e){
        res.status(400).send()
        console.log('uncorret')
    }
})



// read profile
router.get('/users/me', auth, async (req, res)=>{
    res.send(req.user)
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

router.delete('/users/me', auth , async (req, res)=>{
    try{
        await req.user.remove()
        sendCancelationEmail(req.user.email, req.user.fname)
        res.send(req.user)
    } catch (e){
        res.status(500).send(e)
    }
})

router.patch('/users/me', auth ,async (req, res)=>{
    const update = Object.keys(req.body)
    const allowupdate =['fname', 'lname', 'age', 'email', 'phoneNumber','password']
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