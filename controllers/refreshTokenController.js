/* *********************************************************************************************************************
    While we Logged In, accessToken has limited Lifetime. 
    We stored refreshToken in cookies, so we can verify that token again and again after accessToken is expired. 
    After verification we could create a new accessToken that will replace the expired one. Thus we could have an access to private routes!
    Lifetime of refreshToken is way longer and set upon request of company.
********************************************************************************************************************* */

const jwt = require('jsonwebtoken')
require('dotenv').config()

const handleRefreshToken = ((req, res) => {
    //We going to look for cookies
    const cookies = req.cookies
    //Check if we don't have any cookies OR we do have cookies but do not have jwt parameter inside ==> return status 401
    if(!cookies?.jwt) return res.sendStatus(401)
    
    //(jwt: alias for refresh token that was created and saved into cookies when Logged In)
    //If we could find jwt parameter in cookies. Let assign it to new const
    const refreshToken = cookies.jwt

    //Evaluate JWT
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if(err) return res.sendStatus(403) //Invalid token. Access Forbidden

            //If there are no errors, so we can create new access token, because refresh token has VERIFIED
            // As a payload we enter "username" that equal to username that was decoded from refreshToken.
            // PS:(decoded.username taken from payload of refreshToken and reasigned to payload of accessToken).
            const accessToken = jwt.sign(
                {"username": decoded.username},
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '900s' }, // 15 minutes or 20 sec for testing
            )
            res.json({accessToken})
        }
    )
})

module.exports = {handleRefreshToken}