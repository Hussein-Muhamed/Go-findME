const express = require('express')
const Post = require('../models/post')
const User = require('../models/user')
const router = express.Router()
const auth = require('../middleware/auth')
const multer = require('multer')
const { upload, deleteImage } = require("../utils/index");
const axios = require('axios')
const fs = require('fs')
const request = require('request')
const path = require('path')

// upload image 
router.post('/post' , auth, upload ,  async (req, res)=>{
    var img = req.file.path.replace(`src\\public\\`, '');
    const posts = new Post({
        ...req.body,
        image:img,
        owner: req.user.userName,
     })
     const imagepath = req.file.path.replace("src","")
     var rootsrc = path.dirname(require.main.filename || process.mainModule.filename);
     var filePath = rootsrc + imagepath;  
     const options = {
            method: "POST",
            url: `http://192.168.1.6:8080/api/filesys/add/image/?pid=${posts.id}`,
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
    try{
        await posts.save()
        res.status(201).send()
    } catch (e){
        res.status(400).send(e)
    }
})

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

router.get('/posts/me', auth, async (req, res)=>{
    try{
        const posts = await Post.find({owner: req.user.userName})
        res.status(200).send(posts)
    } catch (e){
        res.statuts(500).send(e)
    }
})

router.get('/posts', async(req, res)=>{
    try{
        const posts = await Post.find({})
        res.status(200).send(posts)
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
        const posts = await Post.findOneAndDelete({ _id : req.params.id, owner: req.user.userName})
        if(!posts){
            res.status(404).send()
        }
        res.status(200).send('the post has been deleted')
    } catch (e) {
        res.status(400).send(e)
    }
})


module.exports = router