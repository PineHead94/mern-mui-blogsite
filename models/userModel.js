const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const userSchema = new Schema({
    username : {
        type : String,
        required : [true,'Enter a Username'],
        unique : [ true,'User already exists' ]
    },
    password : {
        type: String,
        required : [true,'Enter a password'],
        minlength : [ 4,'Atlest 4 chars' ]
    }
})


userSchema.pre('save',async function (next){
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password,salt)
    next()
})

userSchema.statics.login = async function (username,password){
    const user = await this.findOne({ username })
    if(user){
        const auth = await bcrypt.compare(password,user.password)
        if(auth){
            return user
        } else {
            throw new Error('Wrong password')
        }
    } else {
        throw new Error('No User with that username')
    }
}

const User = mongoose.model('user',userSchema)
module.exports = User