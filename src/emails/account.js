const sgMail = require('@sendgrid/mail')
const sendgridAPIKey = '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'

// sgMail.setApiKey(sendgridAPIKey)

// sgMail.send({
//     to:'gofindme9@gmail.com',
//     from:'gofindme9@gmail.com',
//     subject:'Hello hussein from our app , go-findme',
//     text:'thank you'
// }).then(()=>{
//     console.log('message send')
// }).catch((error)=>{
//     console.log(error.response.body)
// })

// api to send reset code 

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'gofindme9@gmail.com',
        subject: 'Thanks for joining in!',
        text: `Welcome to the app, ${name}. Let me know how you get along with the app.`
    })
}

const sendCancelationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'gofindme9@gmail.com',
        subject: 'Sorry to see you go!',
        text: `Goodbye, ${name}. I hope to see you back sometime soon.`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancelationEmail
}