import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Button } from 'react-bootstrap'

const BlogList = () => {
    const blogs = useSelector((state) => state.blogs)

    return (
        <div className="anecdotes">
            {blogs &&
                blogs.map((blog) => (
                    <div key={blog.id}>
                        <Button variant="link" className="text-left" as={Link} to={`blogs/${blog.id}`}>
                            {blog.title} - {blog.author}
                        </Button>
                    </div>
                ))}
        </div>
    )
}

export default BlogList
