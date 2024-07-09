const express = require('express')
const router = express.Router()
const PostController = require('../controllers/PostsController')
const { authentication } = require('../middlewares/authentication')


router.post('/', authentication ,PostController.create)
router.post ('/:_id', authentication,PostController.update)
router.put ('/comments/:_id', authentication, PostController.insertComment)
router.delete ('/:_id', authentication,PostController.delete)


router.get ('/', PostController.getAllPages)
router.get ('/name/:name', PostController.getPostsByName)
router.get ('/id/:_id',PostController.getById)


module.exports = router