import React, { useState } from 'react'
import { Form, Input } from './Form'
import Togglable from './Togglable'

const CreateBlog = ({ createBlog, passRef }) => {
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')

  const handleNewBlog = async (event) => {
    event.preventDefault()
    const blogObject = { title: newBlogTitle, author: newBlogAuthor, url: newBlogUrl }
    createBlog(blogObject)
    setNewBlogTitle('')
    setNewBlogAuthor('')
    setNewBlogUrl('')
  }

  return (
    <div className="createBlog">
      <Togglable showLabel="Create a new blog" ref={passRef}>
        <Form heading="Create new" handleSubmit={handleNewBlog} submitText="Add new blog">
          <Input
            type="text"
            text="title"
            value={newBlogTitle}
            handleChange={(event) => setNewBlogTitle(event.target.value)}
            id="new-blog-title"
          ></Input>
          <Input
            type="text"
            text="author"
            value={newBlogAuthor}
            handleChange={(event) => setNewBlogAuthor(event.target.value)}
            id="new-blog-author"
          ></Input>
          <Input
            type="text"
            text="url"
            value={newBlogUrl}
            handleChange={(event) => setNewBlogUrl(event.target.value)}
            id="new-blog-url"
          ></Input>
        </Form>
      </Togglable>
    </div>
  )
}
export default CreateBlog
