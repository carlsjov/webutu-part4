const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response) => {
    Blog
      .find({})
      .then(blogs => {
        response.json(blogs)
    })
})
  
blogsRouter.post('/', (request, response) => {
   const blog = new Blog(request.body)
  
    blog
      .save()
      .then(result => {
        response.status(201).json(result)
      })
})

blogsRouter.delete('/:id', async (request, response) => {
  const id = request.params.id
  await Blog.findByIdAndDelete(id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const updateBlog = request.body

  const blog = {
    title: updateBlog.title,
    author: updateBlog.author,
    url: updateBlog.url,
    likes: updateBlog.likes
  }

  await Blog.findByIdAndUpdate(request.params.id, blog)
  response.json(blog)
})

module.exports = blogsRouter