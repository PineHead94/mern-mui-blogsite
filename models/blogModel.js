const mongoose = require('mongoose')
const Schema = mongoose.Schema

const blogSchema = new Schema({
    author : {
        type : String,
        required : [true,'Author name required']
    },
    title : {
        type : String,
        required : [true,'Title required`']
    },
    blog : {
        type : String,
        required : [true,'Blog required']
    }
},{ timestamps : true })

const Blog = mongoose.model('blog',blogSchema)
module.exports = Blog