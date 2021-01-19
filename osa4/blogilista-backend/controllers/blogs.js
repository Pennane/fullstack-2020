const router = require('express').Router()
const Blog = require('../models/blog')

router.get('/', async (request, response) => {
  const Blogs = await Blog.find({})
  response.json(Blogs.map((blog) => blog.toJSON()))
})

router.put('/:id', async (request, response) => {
  const { id } = request.params

  if (!id) {
    return response.status(400).send({ error: 'Missing Id' })
  }

  let updatedBlog = await Blog.findByIdAndUpdate(id, request.body, { new: true })
  response.json(updatedBlog)
})

router.post('/', async (request, response) => {
  const blog = new Blog(request.body)
  const savedBlog = await blog.save()
  response.json(savedBlog.toJSON())
})

router.delete('/:id', async (request, response) => {
  const { id } = request.params
  await Blog.findByIdAndDelete(id)
  response.status(204).end()
})

router.delete('/', async (request, response) => {
  response.status(400).send({ error: 'Can not delete without an id' })
})

module.exports = router
