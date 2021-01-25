import React from 'react'
import { Link } from 'react-router-dom'

import CurrentUser from './CurrentUser'

const Navigation = () => {
    const linkStyle = {
        marginRight: 8
    }
    return (
        <div className="nav">
            <Link style={linkStyle} to="/">
                Home
            </Link>
            <Link style={linkStyle} to="/users">
                Users
            </Link>
            <CurrentUser />
        </div>
    )
}

export default Navigation
