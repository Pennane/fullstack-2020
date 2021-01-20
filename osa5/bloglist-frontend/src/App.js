import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import CreateBlog from './components/CreateBlog'
import ErrorMessage from './components/ErrorMessage'
import CurrentUser from './components/CurrentUser'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')

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
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    setUser(null)
    setUsername('')
    setPassword('')
    blogService.setToken(null)
    window.localStorage.removeItem('loggedUser')
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
    } catch (exception) {
      setErrorMessage('Failed to add new blog')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  if (user === null) {
    return (
      <div>
        <h1>Blogs</h1>
        <ErrorMessage message={errorMessage} />
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
      <ErrorMessage message={errorMessage} />
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
