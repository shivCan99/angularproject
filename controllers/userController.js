const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const User = require('../models/User')
// getting setting
const settings = require('../config/settings')



/* -------------------------------------------------------- REGISTER USER ----------------------------------------------- */
const registerNewUser = (async(req, res) => {
    // check if username is already in collection.
    User
        .findOne({ username: req.body.username })
        .then(user => {
            if (user) {
                res.status(400).send('Username already there.')
            }
            else {
                //Create new object with data provided by the Client
                const user = new User({
                    name: req.body.name,
                    username: req.body.username,
                    password: req.body.password
                })
                console.log(user)
                // Encrypting the password using bcryptjs
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(user.password, salt, (err, hash) => {
                        if (err) {
                            return res.status(400).send('Not Registered, Contact Admin!')
                        }
                        else {
                            // Hashed password assigned instead of regular one
                            user.password = hash
                            // Add new user with hashed password to database collection
                            user.save()
                        }
                    })
                })
            }
        })
        .catch(err => res.send(err))
})

/* -------------------------------------------------------- LOG IN USER ----------------------------------------------- */
const loginUser = ((req, res) => {
    // Use data from submiting the form
    username = req.body.username
    password = req.body.password
    // Check if username is already in collection.
    User
        .findOne({ username: req.body.username })
        .then(user => {
            //USER EXISTS IN THE SYSTEM
            if (user) {
                //COMPARE PASSWORD
                bcrypt
                    .compare(password, user.password)
                    .then(
                        (isCompared) => {
                            //PASSWORD CORRECT
                            if (isCompared) {
                                //Generate PAYLOAD for JWT, so it could contain that data
                                const payload = {
                                    id: user.id,
                                    name: user.name,
                                    username: user.username
                                }
                                //Generate JWT for that User
                                //Sign() method used to create token, and send it back as response
                                const accessToken = jwt.sign(
                                    payload,
                                    process.env.ACCESS_TOKEN_SECRET,
                                    { expiresIn: '900s' }, // 15 minutes or 20 sec for testing
                                )
                                const refreshToken = jwt.sign(
                                    payload,
                                    process.env.REFRESH_TOKEN_SECRET,
                                    { expiresIn: '1d' } // should be longer, for example 1 day
                                )
                                //We want to store refreshToken in database, that allow us to invalidate token in future when user is logout before token expire
                                //TODO: later
                                
                                /* Refresh Token we going to save in a cookie. BUT in terms of security we need to make httpOnly.
                                   So Token is unaccessable to JS and no one could hack it */
                                res.cookie('jwt', refreshToken, {httpOnly: true,  maxAge: 24 * 60 * 60 * 1000}) //maxAge in miliseconds = 1 day
                                //Send Tokens to Front End
                                res.json({accessToken}) 
                                
                            }
                            //PASSWORD INCORRECT
                            else {
                                res.status(401).send('Password is not correct')
                            }
                        }
                    )
                    .catch()
            }
            //USER DOES NOT EXISTS IN THE SYSTEM
            else {
                res.status(400).send('Username is not there.')
            }
        })
})

/* -------------------------------------------------------- UPDATE USER PASSWORD----------------------------------------------- */
// const updatePswd = (
//     // TODO:
// )

module.exports = {
    registerNewUser,
    loginUser
}

//Add to line 87: {httpOnly: true, sameSite: 'None', secure: true,...}