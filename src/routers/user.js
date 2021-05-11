const express = require('express')
const router = express.Router()
const User = require('../models/user')
const auth = require('../middleware/auth')
const { response } = require('express')
const {sendWelcomeEmail, sendCancelationEmail} = require('../emails/account')

router.post('/users', async (req, res)=>{
    const user = await new User(req.body)
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
    } catch (e){
        res.status(400).send(e)
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
        // const user = await User.findByIdAndDelete(req.params.id)
        // res.status(200).send("User has been deleted!")
        await req.user.remove()
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