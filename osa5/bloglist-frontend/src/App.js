import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import CreateBlog from './components/CreateBlog'
import Notification from './components/Notification'
import CurrentUser from './components/CurrentUser'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState('')
  const [notificationName, setNotificationName] = useState('')
  const [notificationType, setNotificationType] = useState('')

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const pushLocalNotification = ({ name, message, type }) => {
    setNotificationMessage(message)
    setNotificationName(name)
    setNotificationType(type)
    setTimeout(() => {
      setNotificationMessage(null)
      setNotificationName(null)
      setNotificationType(null)
    }, 5300)
  }

  const login = async (userObject) => {
    try {
      const user = await loginService.login(userObject)
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      pushLocalNotification({ name: 'Success', message: 'Logged in as ' + user.username, type: 'success' })
    } catch (exception) {
      pushLocalNotification({ name: 'Error', message: 'Wrong username or password', type: 'error' })
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    setUser(null)
    blogService.setToken(null)
    window.localStorage.removeItem('loggedUser')
    pushLocalNotification({ name: 'Logged out', type: 'success' })
  }

  const likeBlog = async (blogObject) => {
    console.log('at likeBlog!!!!!!!!!')
    console.log(blogObject)
    try {
      const likedBlog = await blogService.like(blogObject)
      setBlogs(blogs.map((blog) => (blog.id === likedBlog.id ? likedBlog : blog)))
    } catch (exception) {
      pushLocalNotification({ name: 'Error', message: 'Failed to like the blog', type: 'error' })
    }
  }

  const deleteBlog = async (blogObject) => {
    try {
      await blogService.remove(blogObject)
      setBlogs(blogs.filter((blog) => blog.id !== blogObject.id))
      pushLocalNotification({ name: 'Removed a blog', type: 'success' })
    } catch (exception) {
      pushLocalNotification({ name: 'Error', message: 'Failed to remove the blog', type: 'error' })
    }
  }

  const createBlog = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility()
      const newBlog = await blogService.create(blogObject)

      setBlogs(blogs.concat(newBlog))
      pushLocalNotification({ name: 'Added a blog', type: 'success' })
    } catch (exception) {
      pushLocalNotification({ name: 'Error', message: 'Failed to add a new blog', type: 'error' })
    }
  }

  if (user === null) {
    return (
      <div>
        <h1>Blogs</h1>
        <Notification message={notificationMessage} name={notificationName} type={notificationType} />
        <LoginForm login={login} />
      </div>
    )
  }

  return (
    <div>
      <h1>Blogs</h1>
      <Notification message={notificationMessage} name={notificationName} type={notificationType} />
      <CurrentUser user={user} handleLogout={handleLogout} />
      <CreateBlog createBlog={createBlog} passRef={blogFormRef} />
      {blogs
        .sort((a, b) => (a.likes >= b.likes ? -1 : 1))
        .map((blog) => (
          <Blog key={blog.id} blog={blog} likeBlog={likeBlog} deleteBlog={deleteBlog} />
        ))}
    </div>
  )
}

export default App
