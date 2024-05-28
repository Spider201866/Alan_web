const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/send-email', (req, res) => {
    const { name, role, latitude, longitude, country, area, version, dateTime } = req.body;

    // Configure the transporter to use sendmail
    const transporter = nodemailer.createTransport({
        sendmail: true,
        newline: 'unix',
        path: '/usr/sbin/sendmail' // Path to the sendmail executable, typically this is correct
    });

    const mailOptions = {
        from: 'no-reply@your-domain.com', // Replace with an appropriate sender email
        to: 'wjw2@st-andrews.ac.uk', // The recipient's email
        subject: 'User Info',
        text: `User Info\n\nName: ${name}\nRole: ${role}\nLat & Long: ${latitude}, ${longitude}\nCountry: ${country}\nArea: ${area}\nVersion: ${version}\nDate & Time: ${dateTime}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send(error.toString());
        }
        res.send('Email sent: ' + info.response);
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
