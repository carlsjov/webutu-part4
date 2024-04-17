const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1})
  response.json(blogs)

})
  
blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const user = await User.findById(body.user)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user.id
  })
  
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog.id)
  await user.save()
  
  response.json(savedBlog)
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