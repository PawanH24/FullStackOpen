const Blog = require('../models/blog')
const blogRouter = require('express').Router()

blogRouter.get('', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogRouter.post('', async (request, response) => {
  const blog = new Blog(request.body)

  const result = await blog.save()
  response.status(201).json(result)
})

blogRouter.delete('/:id',async(req,res) => {
  const id = req.params.id
  await Blog.findByIdAndDelete(id)
  res.status(204).end()

})

blogRouter.put('/:id', async (request, response) => {
  const data = request.body
  const id = request.params.id

  const updatedBlog = await Blog.findByIdAndUpdate(id,
    data,
    {
      returnDocument: 'after',
    }
  )

  response.json(updatedBlog)
})

module.exports = blogRouter