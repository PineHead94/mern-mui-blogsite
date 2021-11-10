const express = require('express')
const router = express.Router()
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')


const handleErrors = (err) => {
    const errors = { username:'',password:'' }
    if(err.message.includes('No User with that username')){
        errors.username = 'No user with that username'
    }
    if(err.message.includes('Wrong password')){
        errors.password = 'Wrong password'
    }
    return errors
}



const maxAge = 60 * 60 * 24 * 3

const createToken = (id) => {
    return jwt.sign({ id },'secret',{
        expiresIn:maxAge
    })
}


router.route('/').post((req,res)=> {
    const { username,password } = req.body
    User.login(username,password)
        .then((user) => {
            const username = user.username
            const token = createToken(user._id)
            res.json({ token,username })
        })
        .catch((err) => {
            const errors = handleErrors(err)
            res.json({ errors })
        })
})


module.exports = router