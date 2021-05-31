const sgMail = require('@sendgrid/mail')
const sendgridAPIKey = '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'

sgMail.setApiKey(sendgridAPIKey)

// api to send reset code 

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: '11111hussein11111@gmail.com',
        subject: 'Thanks for joining in!',
        text: `Welcome to the app, ${name}. Let me know how you get along with the app.`
    })
}

const sendCancelationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: '11111hussein11111@gmail.com',
        subject: 'Sorry to see you go!',
        text: `Goodbye, ${name}. I hope to see you back sometime soon.`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancelationEmail
}