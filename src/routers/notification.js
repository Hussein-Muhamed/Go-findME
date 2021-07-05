const express = require('express')
const auth = require('../middleware/auth')
const Notification = require('../models/notification')
const router = express.Router()

router.post('/notification', auth , async (req, res)=>{
    const notification = new Notification({
        ...req.body,
        uid: req.user._id,
        })
    try{
        await notification.save()
        res.status(201).send(notification)
    } catch (e){
        res.status(400).send(e)
    }
})

router.get('/notification', auth, async (req, res)=>{
    try{
        const notification = await Notification.find({})
        res.status(200).send(notification)
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router