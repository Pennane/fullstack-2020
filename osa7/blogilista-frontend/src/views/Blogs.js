import React from 'react'

import BlogList from '../components/BlogList'
import CreateBlog from '../components/CreateBlog'

const Blogs = () => {
    return (
        <div>
            <h2>List of all known blogs</h2>
            <BlogList />
            <CreateBlog />
        </div>
    )
}

export default Blogs
