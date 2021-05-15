const request = require('request')
const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Post = require('./models/post')
const path = require('path')
const userrouter = require('./routers/user')
const postrouter = require('./routers/post')
const auth = require('./middleware/auth')
// const {sendWelcomeEmail, sendCancelationEmail} = require('./emails/account')



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
app.use(userrouter)
app.use(postrouter)

app.listen(port , ()=>{
    console.log(`The server connection on port ${port}`)
})

// const main = async () => {
//     const user = await User.findById('609a2e76dc457b41e8055785')
//     await user.populate('posts').execPopulate()
//     console.log(user.posts)
// } 
// main()
