const router = require('express').Router()
const Blog = require('../models/blog')
const logger = require('../utils/logger')

router.get('/', (request, response) => {
  Blog.find({})
    .then((blogs) => response.json(blogs))
    .catch((error) => logger.error(error))
})

router.post('/', (request, response) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then((result) => response.status(201).json(result))
    .catch((error) => logger.error(error))
})

module.exports = router
