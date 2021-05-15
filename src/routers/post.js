const express = require('express')
const Post = require('../models/post')
const router = express.Router()
const auth = require('../middleware/auth')

router.post('/post', auth,  async (req, res)=>{
    // const posts = await new Post(req.body)
    const posts = new Post({
        ...req.body,
        owner: req.user._id
    })
    try{
        await posts.save()
        res.status(201).send(posts)
    } catch (e){
        res.status(400).send(e)
    }
})

router.get('/posts',auth, async (req, res)=>{
    const match = {}
    if(req.query.region)
        match.region = req.query.region
    if(req.query.city)
        match.city = req.query.city
    if(req.query.typeofperson)
        match.typeofperson = req.query.typeofperson
    if (req.query.gender )
        match.gender = req.query.gender
    if (req.query.completed)
        match.completed = req.query.completed === 'true'
    try{
        await req.user.populate({
            path:'posts',
            match,
            options:{
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip)
            }
        }).execPopulate()
        res.send(req.user.posts)
    } catch (e){
        res.status(400).send(e)
    }
})

router.get('/posts/:id', async (req, res)=>{
    try{
        const posts = await Post.findOne(req.params._id)
        res.status(200).send(posts)
    } catch (e){
        res.status(500).send(e)
    }
})

router.delete('/posts/:id',auth, async (req, res)=>{
    try{
        const posts = await Post.findOneAndDelete({_id: req.params.id, owner:req.user._id})
        if(!posts){
            res.status(404).send()
        }
        res.status(200).send('the post has been deleted')
    } catch (e) {
        res.status(400).send(e)
    }
})


module.exports = router