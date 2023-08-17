const express = require('express')
const router = express.Router()

// Methods that handeling the requests in 'controllers' Folder
const refreshTokenController = require('../controllers/refreshTokenController')


// Route to refresh token --> URL : /refresh/
router.route('/')
    .get(refreshTokenController.handleRefreshToken)

module.exports = router