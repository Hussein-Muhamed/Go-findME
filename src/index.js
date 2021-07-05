const request = require('request')
const express = require('express')
const cors = require('cors')
require('./db/mongoose')
const User = require('./models/user')
const Post = require('./models/post')
const Trusted = require('./models/trustedPeople')
const path = require('path')
const userrouter = require('./routers/user')
const postrouter = require('./routers/post')
const trustedrouter = require('./routers/trustedPeolple')
const auth = require('./middleware/auth')
const validator = require('validator')
// const {sendWelcomeEmail, sendCancelationEmail} = require('./emails/account')
const bodyParser = require("body-parser");
const port = process.env.PORT
const app = require('express')();


app.use(cors())
// const viewPath = path.join(dirname, '../public/css')
// const stylePath = path.join(dirname, '../public/html')
// app.use(express.static(viewPath))
// app.use(express.static(stylePath))

app.use(express.json())
app.use(userrouter)
app.use(postrouter)
app.use(trustedrouter)
app.use(bodyParser.json());
app.use('/public', express.static(path.join(__dirname, 'public')))

const server = require('http').createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: "http://localhost:3001/",
    }
});
io.on('connection', (socket) => {
    console.log("new user connected");
    socket.on('disconnect', () => {
        console.log("new user disconnected");
    });
    socket.on('new_message', (data) => {
        console.log("new message !!!");
        socket.broadcast.emit('msgFromServer', data);
    });
});

server.listen(3000);