const express = require('express')
const app = express()
app.use(express.json())
const { typeError }= require('./middlewares/errors')
const { dbConnection } = require('./config/config')
require('dotenv').config()

app.use(express.json())
dbConnection()

app.use ('/posts', require('./routes/posts'))
app.use ('/comments', require ('./routes/comments'))
app.use ('/users', require ('./routes/users'))

app.use(typeError)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log (`Servidor levantado en el puerto ${PORT}`))