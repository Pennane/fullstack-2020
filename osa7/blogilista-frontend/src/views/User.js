import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const UserView = () => {
    const { id } = useParams()

    const users = useSelector((state) => state.users)
    const user = users ? users.find((user) => user.id === id) : null

    if (!user) {
        return null
    }

    return (
        <div>
            <h2>{user.name}</h2>
            {user.blogs.length !== 0 && (
                <div>
                    <h3>Added blogs</h3>
                    <ul>
                        {user.blogs.map((blog) => (
                            <div key={blog.id}>
                                <Link to={`/blogs/${blog.id}`}>
                                    {blog.title} - {blog.author}
                                </Link>
                            </div>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}

export default UserView
