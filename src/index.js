const request = require('request')
const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const path = require('path')

const port = process.env.PORT || 3000
const app = express()

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsDirectoryPath = path.join(__dirname, '../views')
// const viewPath = path.join(__dirname, '../public/css')
// const stylePath = path.join(__dirname, '../public/html')
app.use(express.static(publicDirectoryPath))
app.use(express.static(viewsDirectoryPath))
// app.use(express.static(viewPath))
// app.use(express.static(stylePath))

app.use(express.json())

// to login user
{
    app.post('/users/login',async (req, res)=>{
        try{
            const user = await User.findByCredentials(req.body.email, req.body.password)
            res.status(201).send(user)
        }catch (e){
            // console.log(e)
            res.status(400).send()
        }   
    })
}

// to create new user 
app.post('/user', async(req, res)=>{
    const user =  new User(req.body)
    try{
        await user.save()
        res.status(201).send(user)
    } catch(e){
        res.status(400).send(e)
    }
})

// to read users
app.get('/users', async (req, res)=>{
    try{
        const users = await User.find({})
        res.status(200).send(users)
    } catch(e){
        res.status(500).send(e)
    }
})

app.listen(port , ()=>{
    console.log(`The server connection on port ${port}`)
})
