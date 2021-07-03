const express = require('express')
const Post = require('../models/post')
const router = express.Router()
const auth = require('../middleware/auth')
const multer = require('multer')
const { upload, deleteImage } = require("../utils/index");
const axios = require('axios')
const fs = require('fs')
const request = require('request')
const path = require('path')
// const upload = multer({
//     limits:{
//         fileSize:5000000
//     },
//     fileFilter(req,file, cb){
//         if (!file.originalname.match(/\.(jpg|png|jpeg)$/))
//             return cb(new Error ('please upload image'))
//         cb(undefined, true)
//     }
// })

router.post('/post', auth , upload ,  async (req, res)=>{
    // const posts = await new Post(req.body)
    var img = req.file.path.replace(`src\\public\\`, '');
    const posts = new Post({
        ...req.body,
        image:img,
        owner: req.user.userName,
    //     // connect to api 
    //     // add photo, post.id to api 
    //     // {
    //     //     image:req.file.path,
    //     //     name: post.id
    //     // }
    //     // image: req.file.buffer
     })

     const imagepath = req.file.path.replace("src","")
     var rootsrc = path.dirname(require.main.filename || process.mainModule.filename);
     var filePath = rootsrc + imagepath;
        
     const options = {
            method: "POST",
            url: `http://192.168.1.2:8080/api/filesys/add/image/?pid=${posts.id}`,
            port: 443,
            headers: {
                "Content-Type": "multipart/form-data"
            },
            formData : {
                "file" : fs.createReadStream(filePath)
            }
        };
        
        request(options, function (err, res, body) {
            if(err) console.log(err);
            console.log(body);
        });
    // console.log(req.file.path)

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