const express = require('express')
const Post = require('../models/post')
const router = express.Router()
const auth = require('../middleware/auth')

router.post('/post', async (req, res)=>{
    const posts = await new Post(req.body)
    try{
        await posts.save()
        res.status(201).send(posts)
    } catch (e){
        res.status(400).send(e)
    }
})

module.exports = router