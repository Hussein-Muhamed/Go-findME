const express = require('express')
const Post = require('../models/post')
const router = express.Router()
const auth = require('../middleware/auth')
const multer = require('multer')

const upload = multer({
    limits:{
        fileSize:5000000
    },
    fileFilter(req,file, cb){
        if (!file.originalname.match(/\.(jpg|png|jpeg)$/))
            return cb(new Error ('please upload image'))
        cb(undefined, true)
    }
})

router.post('/post', auth, upload.single('image'),  async (req, res)=>{
    // const posts = await new Post(req.body)
    
    const posts = new Post({
        ...req.body,
        owner: req.user.userName,
        // connect to api 
        // add photo, post.id to api 
        // {
        //     image:binary,
        //     name: post.id
        // }
        image: req.file.buffer
    })

    try{
        await posts.save()
        res.status(201).send()
    } catch (e){
        res.status(400).send(e)
    }
})


// get image from api using post.id
//

//get image from database
router.get('/post/:id/image', async(req, res)=>{
    try{
        const post = await Post.findById(req.params.id)
        res.set('Content-Type','image/jpg')
        res.send(post.image)
    } catch (e) {
        res.status(404).send()
    }
})

router.get('/posts/me',auth, async (req, res)=>{
    const match = {}
    if(req.query.region)
        match.region = req.query.region
    if(req.query.city)
        match.city = req.query.city
    if(req.query.typeofperson)
        match.typeofperson = req.query.typeofperson
    if (req.query.gender )
        match.gender = req.query.gender
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

router.get('/posts', async(req, res)=>{
    try{
      const posts = await Post.find({}) 
        res.status(200).send(posts) 
    } catch (e) {
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