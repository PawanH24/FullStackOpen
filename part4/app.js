const express = require('express')
const mongoose = require('mongoose')
const blogRouter = require('./controllers/blog.controller')
const config = require('./utils/config')


const app = express()

const url = config.MONGODB_URI

mongoose.connect(url,{ family: 4 }).then(() => {
  console.log('connected to MongoDB')
}).catch((error) => {
  console.log('error connecting to MongoDB:', error.message)
})

app.use(express.json())
app.use('/api/blog',blogRouter)

module.exports = app