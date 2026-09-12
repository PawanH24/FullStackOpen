const Blog = require('../models/blog')
const User = require('../models/user')
const blogRouter = require('express').Router()
const jwt = require('jsonwebtoken')

const getTokenFrom = (req) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

blogRouter.get('', async (request, response) => {
  const blogs = await Blog.find({}).populate('user','username name id')
  response.json(blogs)
})

blogRouter.post('', async (request, response) => {
  const { title,author,url,likes } = request.body

  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)

  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }

  const user = await User.findById(decodedToken.id)
  if (!user) {
    return response.status(400).json({ error: 'UserId missing or not valid' })
  }

  const blog = new Blog({
    title,author,url,likes,
    user:user._id
  })

  const result = await blog.save()
  user.blogs = user.blogs.concat(result._id)
  await user.save()
  response.status(201).json(result)
})

blogRouter.delete('/:id',async(req,res) => {
  const id = req.params.id
  await Blog.findByIdAndDelete(id)
  res.status(204).json({ message:'Succesfully deleted' }).end()

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