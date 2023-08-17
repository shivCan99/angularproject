/* *********************************************************************************************************************
    Allow us to Log out and erase the refreshToken, so when we Log In again new refreshToken gonna be created.
    Also you need to delete the token from FRONT END
********************************************************************************************************************* */

const handleLogout = ((req, res) => {
    //We going to look for cookies
    const cookies = req.cookies
    //Check if we don't have any cookies OR we do have cookies but do not have jwt parameter inside ==> All good
    if(!cookies?.jwt) return res.sendStatus(204) // No content
    
    //(jwt: alias for refresh token that was created and saved into cookies when Logged In)
    //If we could find jwt parameter in cookies. Let assign it to new const
    const refreshToken = cookies.jwt

    //Delete refreshToken
    // IMPLEMENT LATER: if we could not find user with refresh token --> clear cookies
    // res.clearCookie('jwt', { httpOnly: true})
    // return res.sendStatus(204) means success
 
})

module.exports = {handleLogout}