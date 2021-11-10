const express = require('express')
const Blog = require('../models/blogModel')

const router = express.Router()

router.route('/').get((req,res) => {
    Blog.find().sort({ createdAt:-1 })
        .then(blogs => res.json({ blogs }))
        .catch(err =>console.log(err) )
})



router.route('/create').post((req,res) => {
    Blog.create(req.body)
     .then(() => res.json({ res:'Blog saved' }))
     .catch( err => console.log(err))
})


router.route('/edit/:id').post((req,res)=>{
    const id = req.params.id
    const { title,blog } = req.body
    Blog.findByIdAndUpdate(id, {title,blog})
        .then((response) => res.json({res:'Updated'}))
        .catch(err => console.log(err))
})

router.route('/delete/:id').delete((req,res)=>{
    const id = req.params.id
    Blog.findByIdAndDelete(id)
        .then((response) => res.json({response}))
        .catch(err => console.log(err))
})

module.exports = router