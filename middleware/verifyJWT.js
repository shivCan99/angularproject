const jwt = require('jsonwebtoken')
require('dotenv').config()

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers['authorization']
    if(!authHeader) return res.sendStatus(401) // 401 - means Unathorized
    console.log(authHeader) //Should look like: Bearer token

    //We want to split authHeader based on the space --> authHeader will contain 2 strings as an array, and the token on index 1
    const token = authHeader.split(' ')[1]

    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if(err) return res.sendStatus(403) //Invalid token. Access Forbidden
            req.username = decoded.username //We decode the username that was passed in payload with token
            next()
        }
    )
}

module.exports = verifyJWT