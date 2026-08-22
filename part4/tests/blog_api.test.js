const assert = require('node:assert')
const { test,after,beforeEach }=require('node:test')
const mongoose=require('mongoose')
const supertest = require('supertest')
const app=require('../app')
const Blog = require('../models/blog')
const { initialBlogs } = require('./test_helper')

const api = supertest(app)



//api/blogs
beforeEach(async() => {
  await Blog.deleteMany({})
  await Blog.insertMany(initialBlogs)
}
)

test('all blogs are returned',async() => {
  const response=await api.get('/api/blogs')

  assert.deepStrictEqual(response.body.length,initialBlogs.length)
})

test('unique identifier of blogs are named id', async () => {
  const response = await api.get('/api/blogs')

  response.body.forEach(blog => {
    assert.ok(blog.id)
    assert.strictEqual(blog._id, undefined)
  })
})

after(async() => {
  await mongoose.connection.close()
})