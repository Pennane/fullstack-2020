import React from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { likeBlog, removeBlog } from '../reducers/blogReducer'

const Blog = () => {
    const { id } = useParams()
    const dispatch = useDispatch()

    const currentUser = useSelector((state) => state.currentUser)
    const blogs = useSelector((state) => state.blogs)

    const blog = blogs ? blogs.find((blog) => blog.id === id) : null

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

    return (
        <div className="blog">
            <div className="header">
                <h5>{blog.title}</h5> <h6>{blog.author}</h6>
            </div>
            <a href={blog.url} target="_blank" rel="noopener noreferrer">
                {blog.url}
            </a>
            <div className="likes">
                <span>
                    Likes: <span className="likesValue">{blog.likes}</span>
                </span>
                <button className="likeButton" onClick={handleLike}>
                    like
                </button>
            </div>
            <div className="poster">
                <span>{blog.user.name || blog.user.username}</span>
            </div>
            {currentUser.username === blog.user.username && (
                <div className="remove">
                    <button onClick={tryRemove}>Delete</button>
                </div>
            )}
        </div>
    )
}

export default Blog
