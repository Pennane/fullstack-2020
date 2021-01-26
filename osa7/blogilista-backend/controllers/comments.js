const router = require('express').Router()
const jwt = require('jsonwebtoken')

const Comment = require('../models/comment')
const User = require('../models/user')
const Blog = require('../models/blog')

router.post('/:blogId', async (request, response) => {
    const { text } = request.body
    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if (!request.token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(decodedToken.id)

    if (!user) {
        return response.status(401).json({ error: 'token invalid' })
    }

    const blog = await Blog.findById(request.params.blogId)

    if (!blog) {
        return response.status(404).json({ error: 'blog id invalid' })
    }

    const comment = new Comment({
        text,
        user: user.id,
        blog: blog.id
    })

    const savedComment = await comment.save()
    blog.comments = blog.comments.concat(savedComment.id)
    await blog.save()
    response.json(savedComment.toJSON())
})

router.delete('/:id', async (request, response) => {
    const { id } = request.params

    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if (!request.token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }

    const comment = await Comment.findById(id)

    if (!comment) {
        return response.status(404).json({ error: 'comment not found' })
    }

    if (comment.user.toString() !== decodedToken.id) {
        return response.status(401).json({ error: 'unauthorized' })
    }

    const blog = await Blog.findById(comment.blog)

    await Comment.findByIdAndDelete(id)
    blog.comments = blog.comments.filter((commentId) => String(commentId) !== String(id))
    await blog.save()
    response.status(204).end()
})

router.delete('/', async (request, response) => {
    response.status(400).send({ error: 'Can not delete without an id' })
})

module.exports = router
