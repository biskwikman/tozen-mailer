require('dotenv').config()
const bodyParser = require('body-parser')
const express = require('express')
const nodemailer = require('nodemailer')
const path = require('path')
const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: true }))

app.listen(port, () => {
  console.log(`nodemailerProject is listening at http://localhost:${port}`)
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, 'static/info-form.html'));
});

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
    clientId: process.env.OAUTH_CLIENTID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    refreshToken: process.env.OAUTH_REFRESH_TOKEN
  }
});

// let mailOptions = {
  // from: 'djosephhenri@gmail.com',
  // to: 'maino.jess@gmail.com',
  // subject: 'testing testing',
  // text: 'testing'
// };

app.post('/', function (req, res) {
  let mailOptions = {
    from: 'djosephhenri@gmail.com',
    to: req.body.email,
    subject: 'tozen mailer test',
    text: 'this is an automated test of the tozen mailer' 
  }
  sendEmail(mailOptions)
  console.log('email has been sent')
  res.sendFile(path.join(__dirname, 'static/postsubmit.html'))
  console.log(req.body)
})

function sendEmail(mailOptions) {
  transporter.sendMail(mailOptions, function(err, data) {
    if (err) {
      console.log("Error " + err)
    } else {
      console.log("Email sent successfully")
    }
  })
}
