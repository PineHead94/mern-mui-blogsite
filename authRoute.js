const jwt = require('jsonwebtoken')

const authRoute = (req,res,next) => {
    const token = req.header('x-auth-token')
    if(token){
        jwt.verify(token,'secret',(err,decodedToken)=>{
            if(decodedToken){
                next()
            } else {
                console.log('Not Authenticated')
            }
        })
    }
    else {
        console.log('Login first')
    }
}

module.exports = authRoute