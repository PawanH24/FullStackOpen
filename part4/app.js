const express = require('express')
const mongoose = require('mongoose')
const blogRouter = require('./controllers/blog.controller')
const config = require('./utils/config')
const usersRouter = require('./controllers/user.controller')
const loginRouter = require('./controllers/login.controller')
const middleware = require('./utils/middleware')


const app = express()

const url = config.MONGODB_URI

mongoose.connect(url,{ family: 4 }).then(() => {
  console.log('connected to MongoDB')
}).catch((error) => {
  console.log('error connecting to MongoDB:', error.message)
})

app.use(express.json())
app.use('/api/blogs',blogRouter)
app.use('/api/users',usersRouter)
app.use('/api/login',loginRouter)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app