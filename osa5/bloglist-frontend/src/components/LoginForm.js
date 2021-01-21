import React from 'react'
import Togglable from './Togglable'

const loginForm = ({ username, password, handleLogin, handleUsernameChange, handlePasswordChange }) => {
  return (
    <Togglable buttonLabel="Log in">
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => handleUsernameChange(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => handlePasswordChange(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </Togglable>
  )
}

export default loginForm
