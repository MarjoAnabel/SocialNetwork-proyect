const express = require('express')
const app = express()
app.use(express.json())
const { typeError }= require('./middlewares/errors')
const { dbConnection } = require('./config/config')
require('dotenv').config()
const swaggerUI = require('swagger-ui-express')
const docs = require('./docs/index')

app.use(express.json())
dbConnection()

app.use ('/posts', require('./routes/posts'))
app.use ('/comments', require ('./routes/comments'))
app.use ('/users', require ('./routes/users'))

app.use(typeError)

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(docs))
const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log (`Servidor levantado en el puerto ${PORT}`))