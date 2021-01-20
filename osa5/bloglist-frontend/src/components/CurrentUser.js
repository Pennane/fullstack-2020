import React from 'react'

const currentUser = ({ user, handleLogout }) => {
  return (
    <div>
      <p>Logged in as {user.name}</p>
      <button onClick={handleLogout}>Log out</button>
    </div>
  )
}

export default currentUser
