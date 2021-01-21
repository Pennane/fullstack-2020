import React, { useState } from 'react'
import Togglable from './Togglable'
import { Form, Input } from './Form'

const LoginForm = ({ login }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (event) => {
    event.preventDefault()
    let userObject = {
      username: username,
      password: password
    }
    setUsername('')
    setPassword('')
    login(userObject)
  }

  return (
    <Togglable showLabel="Log in">
      <Form handleSubmit={handleLogin} heading="Login" submitText="Login">
        <Input
          text="username"
          value={username}
          handleChange={(event) => setUsername(event.target.value)}
          type="text"
          id="username"
        />
        <Input
          text="password"
          value={password}
          handleChange={(event) => setPassword(event.target.value)}
          type="password"
          id="password"
        />
      </Form>
    </Togglable>
  )
}

export default LoginForm
