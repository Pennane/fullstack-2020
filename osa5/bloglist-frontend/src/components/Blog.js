import React from 'react'
import Togglable from './Togglable'

const Blog = ({ blog, likeBlog, deleteBlog, currentUser }) => {
  let { title, author, url, user, likes } = blog

  const confirmDelete = (blog) => {
    let confirmed = window.confirm(`Are you sure you want to remove blog '${blog.title}' from '${blog.author}'?`)
    if (confirmed) {
      deleteBlog(blog)
    }
  }

  const extendedView = (
    <div className="extended">
      <a href={url} target="_blank"></a>
      <div className="likes">
        <span>
          Likes: <span className="likesValue">{likes}</span>
        </span>
        <button className="likeButton" onClick={() => likeBlog(blog)}>
          like
        </button>
      </div>
      <div className="poster">
        <span>{user.name || user.username}</span>
      </div>
      {currentUser.name === blog.user.name && (
        <div className="remove">
          <button onClick={() => confirmDelete(blog)}>Delete</button>
        </div>
      )}
    </div>
  )

  return (
    <div className="blog">
      <div className="header">
        <h5>{title}</h5> <h6>{author}</h6>
      </div>
      <Togglable showLabel="view" hideLabel="close" buttonPlacement="before">
        {extendedView}
      </Togglable>
    </div>
  )
}

export default Blog
