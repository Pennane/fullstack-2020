import blogService from '../services/blogs'

const sortBlogs = (blogs) =>
    blogs.sort((a, b) => {
        if (a.likes < b.likes) {
            return 1
        } else if (a.likes > b.likes) {
            return -1
        } else {
            return 0
        }
    })

const reducer = (state = [], action) => {
    switch (action.type) {
        case 'INIT':
            return sortBlogs(action.payload)
        case 'CREATE':
            return sortBlogs([...state, action.payload])
        case 'DELETE':
            return sortBlogs(state.filter((blog) => blog.id !== action.payload))
        case 'UPDATE':
            return sortBlogs(state.map((blog) => (blog.id === action.payload.id ? action.payload : blog)))
        case 'COMMENT':
            let comment = action.payload.comment
            let blog = state.find((b) => b.id === action.payload.blog.id)
            blog.comments.push(comment)
            return sortBlogs(state.map((b) => (b.id === blog.id ? blog : b)))
        default:
            return state
    }
}

export const initializeBlogs = () => {
    return async (dispatch) => {
        const blogs = await blogService.getAll()
        dispatch({
            type: 'INIT',
            payload: blogs
        })
    }
}

export const createBlog = (content) => {
    return async (dispatch) => {
        const newBlog = await blogService.create(content)
        dispatch({
            type: 'CREATE',
            payload: newBlog
        })
    }
}

export const removeBlog = (blog) => {
    return async (dispatch) => {
        await blogService.remove(blog)
        dispatch({
            type: 'DELETE',
            payload: blog.id
        })
    }
}

export const likeBlog = (blog) => {
    return async (dispatch) => {
        const updatedBlog = await blogService.like(blog)
        dispatch({
            type: 'UPDATE',
            payload: updatedBlog
        })
    }
}

export const sendComment = ({ blog, text }) => {
    return async (dispatch) => {
        const comment = await blogService.comment({ blog, text })
        dispatch({
            type: 'COMMENT',
            payload: {
                blog,
                comment
            }
        })
    }
}

export default reducer
