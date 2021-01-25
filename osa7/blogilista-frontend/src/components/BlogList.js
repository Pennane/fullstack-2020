import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const BlogList = () => {
    const blogs = useSelector((state) => state.blogs)

    return (
        <div className="anecdotes">
            {blogs &&
                blogs.map((blog) => (
                    <div key={blog.id}>
                        <Link to={`blogs/${blog.id}`}>
                            {blog.title} - {blog.author}
                        </Link>
                    </div>
                ))}
        </div>
    )
}

export default BlogList
