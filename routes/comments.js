const express = require('express')
const router = express.Router()
const CommentController = require('../controllers/CommetsController')

router.post('/', CommentController.create)

module.exports = router