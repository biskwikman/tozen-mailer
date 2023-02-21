require('dotenv').config()
const bodyParser = require('body-parser')
const express = require('express')
const nodemailer = require('nodemailer')
const path = require('path')
const app = express()
const port = process.env.PORT || 8080

app.use(bodyParser.urlencoded({ extended: true }))

app.listen(port, () => {
  console.log(`tozen-mailer is listening at http://localhost:${port}`)
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, 'static/info-form.html'));
});

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.MAIL_USERNAME,
    clientId: process.env.OAUTH_CLIENTID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    refreshToken: process.env.OAUTH_REFRESH_TOKEN,
  }
});

app.post('/', function (req, res) {
  let mailOptions = {
    from: 'djosephhenri@gmail.com',
    to: req.body.email,
    subject: 'tozen mailer test.',
    text: 'this is an automated test of the tozen mailer. ' + '\n' +
      'first name: ' + req.body.fname[0] + ', ' + req.body.fname[1] + '\n' +
      'last name: ' + req.body.lname[0] + ', ' + req.body.lname[1]
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
