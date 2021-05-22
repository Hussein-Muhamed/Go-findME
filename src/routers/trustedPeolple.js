const express = require('express')
// const User = require('../models/user')
const Trusted = require('../models/trustedPeople')
const auth = require('../middleware/auth')
const router = express.Router()


router.post('/trusted', auth, async (req, res)=>{
    const trusted = new Trusted({
        ...req.body,
        owner: req.user._id,
        })
    try{
        await trusted.save()
        res.status(201).send(trusted)
    } catch (e){
        res.status(400).send(e)
    }
})

router.get('/trusted', auth, async(req, res)=>{
    try{
        const trusted = await  Trusted.find({})
        res.status(200).send(trusted)
    } catch (e) {   
        res.status(400).send()
    }
})

router.delete('/trusted/:id', auth, async(req, res)=>{
    try{
        const trusted = await Trusted.findByIdAndDelete(req.params.id)
        res.status(200).send()
    } catch (e) {
        res.status(400).send()
    }
})

module.exports = router
