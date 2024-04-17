const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const config = require('./utils/config')
const blogsRouter = require('./controllers/blogs')
const logger = require('./utils/logger')
const usersRouter = require('./controllers/users')

const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

logger.info('connecting to MongoDB')

mongoose.connect(config.MONGODB_URI).then(res => {
    logger.info('connected to MongoDB')
}).catch((error) => {
    logger.info('error connecting to MongoDB:', error.message)
})

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)

module.exports = app