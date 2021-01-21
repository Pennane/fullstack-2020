import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import CreateBlog from './components/CreateBlog'
import Notification from './components/Notification'
import CurrentUser from './components/CurrentUser'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')
  const [notificationMessage, setNotificationMessage] = useState('')
  const [notificationName, setNotificationName] = useState('')
  const [notificationType, setNotificationType] = useState('')

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

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password
      })

      window.localStorage.setItem('loggedUser', JSON.stringify(user))

      blogService.setToken(user.token)

      setUser(user)
      setUsername('')
      setPassword('')
      pushLocalNotification({ name: 'Success', message: 'Logged in as ' + user.username, type: 'success' })
    } catch (exception) {
      pushLocalNotification({ name: 'Error', message: 'Wrong username or password', type: 'error' })
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    setUser(null)
    setUsername('')
    setPassword('')
    blogService.setToken(null)
    window.localStorage.removeItem('loggedUser')
    pushLocalNotification({ name: 'Logged out', type: 'success' })
  }

  const handleUsernameChange = (value) => {
    setUsername(value)
  }

  const handlePasswordChange = (value) => {
    setPassword(value)
  }

  const handleNewBlog = async (event) => {
    event.preventDefault()
    try {
      const blogObject = { title: newBlogTitle, author: newBlogAuthor, url: newBlogUrl }
      const newBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(newBlog))
      setNewBlogTitle('')
      setNewBlogAuthor('')
      setNewBlogUrl('')
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
        <LoginForm
          username={username}
          password={password}
          handleLogin={handleLogin}
          handleUsernameChange={handleUsernameChange}
          handlePasswordChange={handlePasswordChange}
        />
      </div>
    )
  }

  return (
    <div>
      <h1>Blogs</h1>
      <Notification message={notificationMessage} name={notificationName} type={notificationType} />
      <CurrentUser user={user} handleLogout={handleLogout} />
      <CreateBlog
        submitValues={{
          title: {
            value: newBlogTitle,
            setter: setNewBlogTitle
          },
          author: {
            value: newBlogAuthor,
            setter: setNewBlogAuthor
          },
          url: {
            value: newBlogUrl,
            setter: setNewBlogUrl
          }
        }}
        handleSubmit={handleNewBlog}
      />
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

export default App
