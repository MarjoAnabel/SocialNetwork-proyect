const express = require('express')
const router = express.Router()
const PostController = require('../controllers/PostsController')
const { authentication, isAuthor } = require('../middlewares/authentication')


router.post('/create', authentication,PostController.create)
router.put ('/update/:_id', authentication,PostController.update)
router.put ('/likes/:_id', authentication, PostController.like)
router.delete ('/delLike/:_id', authentication, PostController.deletelikes)
router.put ('/comments/:_id', authentication, PostController.insertComment)
router.delete ('/delete/:_id', authentication,isAuthor,PostController.delete)


router.get ('/', PostController.getAllPages)
router.get ('/name/:name', PostController.getPostsByName)
router.get ('/id/:_id',PostController.getById)


module.exports = router