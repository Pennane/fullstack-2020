import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import CurrentUser from './CurrentUser'

const Navigation = () => {
    return (
        <Navbar bg="light">
            <Nav variant="pills">
                <Nav.Item>
                    <Nav.Link eventKey="blogs" as={Link} to="/">
                        Blogs
                    </Nav.Link>
                </Nav.Item>

                <Nav.Item>
                    <Nav.Link eventKey="users" as={Link} to="/users">
                        Users
                    </Nav.Link>
                </Nav.Item>
            </Nav>
            <CurrentUser />
        </Navbar>
    )
}

export default Navigation
