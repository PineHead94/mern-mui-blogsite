const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')
const blogRoute = require('./routes/blogRoute')
const signupRoute = require('./routes/signupRoute')
const loginRoute = require('./routes/loginRoute')
const authRoute = require('./authRoute')

const app = express()
dotenv.config()
app.use(express.json())
app.use(cors({
    credentials:true,
    origin : 'http://localhost:3000'
}))

const port = process.env.PORT || 8000
// const dbURI = process.env.DB_URI

mongoose.connect(process.env.DB_URI)
    .then(() => console.log('connected to db'))
    .catch((err) => console.log(err))
    
app.use(express.static(path.join(__dirname, './build')))
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './build'))
})
app.use('/signup',signupRoute)
app.use('/login',loginRoute)
app.use('/blogs', authRoute, blogRoute)


app.listen(port,() => console.log(`listening on port ${port}`))