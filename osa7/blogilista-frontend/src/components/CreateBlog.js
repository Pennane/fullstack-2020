import React from 'react'
import Togglable from './Togglable'
import { createBlog } from '../reducers/blogReducer'
import { updateUser } from '../reducers/userReducer'
import { useDispatch, useSelector } from 'react-redux'
import { useField } from '../hooks'

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
        resetBlogForm()
    }

    return (
        <div className="createBlog">
            <Togglable showLabel="Create a new blog" ref={passRef}>
                <form heading="Create new" onSubmit={handleNewBlog}>
                    <label htmlFor="new-blog-title">
                        <span>Title</span>
                        <input {...content} />
                    </label>
                    <label htmlFor="new-blog-author">
                        <span>Author</span>
                        <input {...author} />
                    </label>
                    <label htmlFor="new-blog-url">
                        <span>Url</span>
                        <input {...url} />
                    </label>

                    <button type="submit">Create</button>
                </form>
            </Togglable>
        </div>
    )
}
export default CreateBlog
