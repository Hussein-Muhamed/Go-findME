const express = require('express')
const auth = require('../middleware/auth')
const Messages = require('../models/messages')
const router = express.Router()

router.post('/message', auth, async (req, res)=>{
    try{    
        const message = new Messages({
            ...req.body,
            uid: req.user._id,
            owner: req.user.userName,
            uavatar: req.user.avatar
            })
        await message.save()
        res.status(201).send(message)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.get('/message', auth, async (req, res)=>{
    try{
        const message = await Messages.find({})
        res.status(200).send(message)
    } catch (e) {
        res.status(500).send(e)
    }
})





module.exports = router