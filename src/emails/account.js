const sgMail = require('@sendgrid/mail')
const sendgridAPIKey = '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'

sgMail.setApiKey(sendgridAPIKey)

// sgMail.send({
//     to: 'gofindmeapplication@gmail.com',
//     from: 'gofindmeapplication@gmail.com',
//     subject: 'Thank you for joining in !',
//     text: ' Wellcome pro'
// })
const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'gofindmeapplication@gmail.com',
        subject: 'Thanks for joining in!',
        text: `Welcome to the app, ${name}. Let me know how you get along with the app.`
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

module.exports = {
    sendWelcomeEmail,
    sendCancelationEmail
}