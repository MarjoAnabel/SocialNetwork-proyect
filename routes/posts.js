const express = require('express')
const router = express.Router()
const PostController = require('../controllers/PostsController')

router.post('/', PostController.create)

module.exports = router