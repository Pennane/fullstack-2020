const router = require('express').Router()
const jwt = require('jsonwebtoken')

const Blog = require('../models/blog')
const User = require('../models/user')

router.get('/', async (request, response) => {
  const Blogs = await Blog.find({}).populate({
    path: 'user',
    populate: {
      path: 'blogs'
    }
  })
  response.json(Blogs.map((blog) => blog.toJSON()))
})

router.put('/:id', async (request, response) => {
  const { id } = request.params

  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(decodedToken.id)

  if (!user) {
    return response.status(401).json({ error: 'token invalid' })
  }

  if (!id) {
    return response.status(400).send({ error: 'Missing Id' })
  }

  const blog = await Blog.findById(id)

  if (!blog) {
    return response.status(404).json({ error: 'blog not found' })
  }

  if (blog.user.toString() !== decodedToken.id) {
    return response.status(401).json({ error: 'unauthorized' })
  }

  let updatedBlog = await Blog.findByIdAndUpdate(id, request.body, { new: true })
  response.json(updatedBlog)
})

router.post('/', async (request, response) => {
  const { title, author, url, likes } = request.body
  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(decodedToken.id)

  if (!user) {
    return response.status(401).json({ error: 'token invalid' })
  }

  const blog = new Blog({
    title,
    author,
    url,
    likes,
    user: user.id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog.id)
  await user.save()
  response.json(savedBlog.toJSON())
})

router.delete('/:id', async (request, response) => {
  const { id } = request.params

  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const blog = await Blog.findById(id)

  if (!blog) {
    return response.status(404).json({ error: 'blog not found' })
  }

  if (blog.user.toString() !== decodedToken.id) {
    return response.status(401).json({ error: 'unauthorized' })
  }

  const user = await User.findById(decodedToken.id)

  await Blog.findByIdAndDelete(id)
  console.log('id', id)
  console.log(user.blogs)
  user.blogs = user.blogs.filter((blogId) => blogId !== id)
  await user.save()
  response.status(204).end()
})

router.delete('/', async (request, response) => {
  response.status(400).send({ error: 'Can not delete without an id' })
})

module.exports = router
