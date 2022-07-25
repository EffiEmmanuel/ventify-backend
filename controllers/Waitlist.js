require('dotenv').config()
const Waitlist = require('../models/Waitlist')
const nodemailer = require('nodemailer')

const joinWaitlist = async (req, res) => {
    const { email } = req.body

    console.log('Email:', email);

    if(!email) {
        return res.status(401).json({ error: 'Some fields are missing!' })
    }

    try {
        console.log('Check check')
        let hasJoinedWaitlist = await Waitlist.find({ email })
        console.log('test:', hasJoinedWaitlist)
        // if(hasJoinedWaitlist) {
        //     return res.status(401).send('You have already joined the waitlist')
        // }

        console.log('Passed check')

        hasJoinedWaitlist = new Waitlist({
            email
        })

        const newWaitlistUser = await hasJoinedWaitlist.save()

        console.log('new waitlist user:', newWaitlistUser)

        // Send confirmaation email
        sendCongratulationsEmail(email)

        return res.status(201).send(`${email}, We have added you to our waitlist!`)

    } catch (error) {
        return res.status(500).send('We encountered a problem. Plese try again')
    }
}

const sendCongratulationsEmail = async (email) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.AUTH_EMAIL,
            pass: process.env.AUTH_PASSWORD
        }
    })

    const template = `
    <br /><div style="flex-direction:column; justify-content:center; align-items:center; background-color:green">
        <img style="width: 100px; object-fit: cover;" src="cid:ventifyLogo@ventify.ng" />
        <h1>Thanks for joinig us!</h1>
        <p>Now you\'ll be the first to know once we launch🎊.</p>
        <p>Thanks for joining us on this journey!</p><br><br>
        <p>Support: <a href="mailto:effiemmanuel.n@gmail.com">support@ventify.ng</a></p><br>
        <p>With love❤️, Ventify.</p>
    </div>
    `

    const mail = {
        from: process.env.AUTH_EMAIL,
        to: email,
        subject: 'Waitlist sign up successful🚀',
        text: 'Hi Emmanuel',
        html: template,
        attachments: [{
            filename: 'Logo-ventify.png',
            path: '../backend/assets/images/Logo-ventify.png',
            cid: 'ventifyLogo@ventify.ng'
        }],
    }

    transporter.sendMail(mail, function(error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log("Email sent successfully: " + info.response);
        }
    })
}

module.exports = {
    joinWaitlist
}