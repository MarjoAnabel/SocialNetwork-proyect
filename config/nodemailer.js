const nodemailer = require('nodemailer')
const { credentials } = require('./keys')['MONGO_URI']
const transporter = nodemailer.createTransport({
 host: 'smtp.gmail.com',
 port: 465,
 secure: true,
 auth: credentials,
})
module.exports = transporter