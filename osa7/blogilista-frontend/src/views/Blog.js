import React from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { likeBlog, removeBlog, sendComment } from '../reducers/blogReducer'
import { Button, ListGroup, Form } from 'react-bootstrap'
import { useField } from '../hooks/index'

const Blog = () => {
    const { id } = useParams()
    const dispatch = useDispatch()

    const currentUser = useSelector((state) => state.currentUser)
    const blogs = useSelector((state) => state.blogs)

    const blog = blogs ? blogs.find((blog) => blog.id === id) : null

    const { reset: removeCommentContent, ...comment } = useField({ type: 'text-area', name: 'comment' })

    if (!blog) {
        return null
    }

    const handleLike = () => {
        dispatch(likeBlog(blog))
    }

    const tryRemove = () => {
        if (window.confirm(`Are you sure you want to remove '${blog.title}'?`)) {
            handleRemove()
        }
    }

    const handleRemove = () => {
        dispatch(removeBlog(blog))
    }

    const handleSendComment = (e) => {
        e.preventDefault()
        removeCommentContent()
        dispatch(
            sendComment({
                blog,
                text: e.target.comment.value
            })
        )
    }

    return (
        <div className="blog">
            <div className="header">
                <h3>
                    {blog.title} {blog.author}
                </h3>
            </div>
            <a href={blog.url} target="_blank" rel="noopener noreferrer">
                {blog.url}
            </a>
            <div className="likes">
                <span>
                    Likes: <span className="likesValue">{blog.likes}</span>
                </span>
                <Button variant="secondary" className="likeButton ml-2" onClick={handleLike}>
                    like
                </Button>
            </div>
            <div className="poster">
                <span>Added by {blog.user.name || blog.user.username}</span>
            </div>
            {currentUser.username === blog.user.username && (
                <div className="remove mt-2">
                    <Button variant="danger" onClick={tryRemove}>
                        Delete
                    </Button>
                </div>
            )}
            <div className="comments">
                <h4>Comments</h4>
                <Form className="commentform" onSubmit={handleSendComment}>
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Control as="input" {...comment} rows={3} />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Add comment
                    </Button>
                </Form>
                {blog.comments && (
                    <ListGroup>
                        {blog.comments.map((comment) => {
                            return <ListGroup.Item key={comment.id}>{comment.text}</ListGroup.Item>
                        })}
                    </ListGroup>
                )}
                {blog.comments.length === 0 && <p>no comments...</p>}
            </div>
        </div>
    )
}

export default Blog
