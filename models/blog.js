const config = require('../utils/config')
const logger = require('../utils/logger')
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

const url = config.MONGODB_URI
mongoose.connect(url).then(res => {
    logger.info('connected to MongoDB')
}).catch((error) => {
    logger.info('error connecting to MongoDB:', error.message)
})

const blogSchema = mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
  })

const Blog = mongoose.model('Blog', blogSchema)

blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Blog', blogSchema)