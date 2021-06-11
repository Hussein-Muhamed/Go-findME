const sgMail = require('@sendgrid/mail')
const jwt = require('jsonwebtoken')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'gofindmeapplication@gmail.com',
        subject: 'Thanks for joining in!',
        html: `Welcome ${name}. Let me know how you get along with the app.`
    })
}

const sendCancelationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'gofindmeapplication@gmail.com',
        subject: 'Sorry to see you go!',
        text: `Goodbye, ${name}. I hope to see you back sometime soon.`
    })
}

const resetPassword = (email, name) =>{
    const password = Math.random() * (100000000 - 100000) + 100000
    const password2 = Math.ceil(password)
    sgMail.send({
        to:email,
        from:'gofindmeapplication@gmail.com',
        subject:'Reset Password',
        html:`
        <p>Hello${name} . <br> Welcome to Go-FindME You forrget the Password no problem. <br> Your new password is : <br>${password2}</b></p>
        `
    }).then(() => {},error => {
        console.log(error)
        if(error.response)
        console.error(error.response.body)
    })
}



module.exports = {
    sendWelcomeEmail,
    sendCancelationEmail,
    resetPassword
    
}