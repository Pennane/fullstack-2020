import React from 'react'

import BlogList from '../components/BlogList'
import CreateBlog from '../components/CreateBlog'

const DefaultView = () => {
    return (
        <div>
            <h1>Blogs</h1>
            <BlogList />
            <CreateBlog />
        </div>
    )
}

export default DefaultView
