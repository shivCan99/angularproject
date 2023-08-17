const express = require('express')
const router = express.Router()

// Methods that handeling the requests in 'controllers' Folder
const userControllers = require('../controllers/userController')
const verifyJWT = require('../middleware/verifyJWT')

// Route to register a user. URL : auth/register
router.route('/register')
    .post(userControllers.registerNewUser)

// Route to login a user. URL : /auth/login
router.route('/login')
    .post(userControllers.loginUser)


module.exports = router