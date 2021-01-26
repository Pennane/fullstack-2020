import React from 'react'
import Togglable from './Togglable'
import { createBlog } from '../reducers/blogReducer'
import { updateUser } from '../reducers/userReducer'
import { createNotification } from '../reducers/notificationReducer'

import { useDispatch, useSelector } from 'react-redux'
import { useField } from '../hooks'
import { Button, Form } from 'react-bootstrap'

const CreateBlog = ({ passRef }) => {
    const dispatch = useDispatch()
    const currentUser = useSelector((state) => state.currentUser)

    const { reset: contentReset, ...content } = useField({ name: 'content', type: 'text' })
    const { reset: authorReset, ...author } = useField({ name: 'author', type: 'text' })
    const { reset: urlReset, ...url } = useField({ name: 'url', type: 'text' })

    const resetBlogForm = () => {
        contentReset()
        authorReset()
        urlReset()
    }

    const handleNewBlog = (event) => {
        event.preventDefault()
        const blogObject = {
            title: content.value,
            author: author.value,
            url: url.value
        }
        dispatch(createBlog(blogObject))
        dispatch(updateUser(currentUser.id))
        dispatch(
            createNotification(
                {
                    message: `Added blog '${blogObject.title}'`
                },
                5000
            )
        )
        resetBlogForm()
    }

    return (
        <div className="createBlog mt-3">
            <Togglable showLabel="Create a new blog" ref={passRef} buttonPlacement="before">
                <Form className="createBlogForm" heading="Create new" onSubmit={handleNewBlog}>
                    <h2>Add a blog</h2>
                    <Form.Group>
                        <Form.Label>Title</Form.Label>
                        <Form.Control {...content} />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Author</Form.Label>
                        <Form.Control {...author} />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Url</Form.Label>
                        <Form.Control {...url} />
                    </Form.Group>

                    <Button className="mb-2" variant="primary" type="submit">
                        Create
                    </Button>
                </Form>
            </Togglable>
        </div>
    )
}
export default CreateBlog
