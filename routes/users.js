const express = require('express')
const router = express.Router()
const UserController = require('../controllers/UsersController')
const { authentication } = require('../middlewares/authentication')
const User = require('../models/User')


router.post('/', UserController.register)
router.post('/login', UserController.login)
// router.get('/confirm/:emailToken', UserController.confirm)
router.get ('/info',authentication,UserController.getInfo)
router.post ('/',authentication,UserController.update)
router.get ('/name/:name',UserController.getUsersByName)
router.get ('/id/:_id', UserController.getById)
router.delete ('/logout', authentication,UserController.logout)

module.exports = router