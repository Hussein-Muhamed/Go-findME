const sgMail = require('@sendgrid/mail')
apikey = "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"
sgMail.setApiKey(apikey)


// sgMail.send({
//     from: 'gofindmeme@gmail.com',
//     to : 'ali_kreba12@gmail.com',
//     subject: 'Message from your son',
//     text: 'Help'
// })

const trusted = () => {
sgMail.send({
    to:"moh239729@gmail.com",
    from:"gofindmeme@gmail.com",
    subject: 'Thanks for joining in!',
    html: `Welcome. Thank You For Joining Us.`
})
}
const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'gofindmeme@gmail.com',
        subject: 'Thanks for joining in!',
        html: `Welcome ${name}. Thank You For Joining Us.`
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
    resetPassword,
    trusted
}