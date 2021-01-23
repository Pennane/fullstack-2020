import React from 'react'

import { Link } from 'react-router-dom'

const Menu = () => {
  const linkStyle = {
    marginRight: 8
  }
  return (
    <div className="nav">
      <Link style={linkStyle} to="/anecdotes">
        Anecdotes
      </Link>
      <Link style={linkStyle} to="/create">
        Create New
      </Link>
      <Link style={linkStyle} to="/about">
        About
      </Link>
    </div>
  )
}

export default Menu
