import React from 'react'
import { useParams } from 'react-router-dom'
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
            <h1>{user.name}</h1>
            {user.blogs.length !== 0 && (
                <div>
                    <h2>Added blogs</h2>
                    <ul>
                        {user.blogs.map((blog) => (
                            <li key={blog.title + '-' + blog.author}>{blog.title}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}

export default UserView
