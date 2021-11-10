const express = require('express')
const router = express.Router()
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')


const handleErrors = (err) => {
    // console.log(err.code,err.message)
    const errors = { username:'',password:'' }
    if(err.message.includes('user validation failed: username')){
        errors.username = 'Enter a Username'
    }
    if(err.message.includes('user validation failed: password')){
        errors.password = 'Enter a Password'
    }
    return errors
}

const maxAge = 60 * 60 * 24 * 3

const createToken = (id) => {
    return jwt.sign({ id },'secret',{
        expiresIn:maxAge
    })
}

router.route('/').post((req,res) => {
    User.create(req.body)
        .then( user => {
            const username = user.username
            const token = createToken(user._id)
            res.json({ token,username })
        })
        .catch( err => {
            const errors = handleErrors(err)
            res.json({ errors })
        })
})


module.exports = router