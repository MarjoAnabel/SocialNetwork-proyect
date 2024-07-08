const express = require('express')
const app = express()
app.use(express.json())

const { dbConnection } = require('./config/config')

app.use(express.json())
dbConnection()

app.use ('/posts', require('./routes/posts'))
app.use ('/comments', require ('./routes/comments'))
app.use ('/users', require ('./routes/users'))

const PORT = 3001
app.listen(PORT, () => console.log (`Servidor levantado en el puerto ${PORT}`))