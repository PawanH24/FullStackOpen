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

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'Async/await simplifies making async calls',
    author: 'Async Ace',
    url: 'https://asyncawait.example.com/',
    likes: 3
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  const titles = response.body.map(blog => blog.title)

  assert.strictEqual(response.body.length, initialBlogs.length + 1)
  assert.ok(titles.includes('Async/await simplifies making async calls'))
})

test('a blog can be deleted', async () => {
  const blogsAtStart = await api.get('/api/blogs')
  const blogToDelete = blogsAtStart.body[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const blogsAtEnd = await api.get('/api/blogs')

  assert.strictEqual(blogsAtEnd.body.length, initialBlogs.length - 1)

  const titles = blogsAtEnd.body.map(blog => blog.title)
  assert.ok(!titles.includes(blogToDelete.title))
})

after(async() => {
  await mongoose.connection.close()
})