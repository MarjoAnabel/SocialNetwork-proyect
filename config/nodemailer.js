const nodemailer = require('nodemailer')
const { credentials } = require('./keys')['credentials']
const transporter = nodemailer.createTransport({
 host: 'smtp.gmail.com',
 port: 465,
 secure: true,
 auth: credentials,
})
module.exports = transporter