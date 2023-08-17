const express = require('express')
const router = express.Router()

// Methods that handeling the requests, lovcated in 'controllers' Folder
const logoutController = require('../controllers/logoutController')

// Route to logout a user. URL : /logout/
router.route('/')
    .get(logoutController.handleLogout)

module.exports = router