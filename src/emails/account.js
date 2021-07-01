const sgMail = require('@sendgrid/mail')
apikey = "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"
sgMail.setApiKey(apikey)

// sgMail.send({
//     from: 'gofindmeme@gmail.com',
//     to : 'gofindmeme@gmail.com',
//     subject: 'hello',
//     text: 'hi'
// })
const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'gofindmeme@gmail.com',
        subject: 'Thanks for joining in!',
        html: `Welcome ${name}. Let me know how you get along with the app.`
    })
}

const sendCancelationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'gofindmeme@gmail.com',
        subject: 'Sorry to see you go!',
        text: `Goodbye, ${name}. I hope to see you back sometime soon.`
    })
}

const resetPassword = (email, name, password2) =>{
    
    sgMail.send({
        to:email,
        from:'gofindmeme@gmail.com',
        subject:'Reset Password !',
        html:`
        <p>Hello ${name} . <br> Welcome to Go-FindME This page to reset your password. <br> Your Password  is : <br>${password2}</b></p>
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