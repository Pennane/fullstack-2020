import React from 'react'
import { logout } from '../reducers/loginReducer'
import { createNotification } from '../reducers/notificationReducer'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Form, Navbar } from 'react-bootstrap'

const CurrentUser = () => {
    const dispatch = useDispatch()
    const currentUser = useSelector((state) => state.currentUser)
    const handleLogout = () => {
        dispatch(logout())
        dispatch(createNotification({ message: `Logged out'` }, 5000))
    }
    if (!currentUser) {
        return null
    }

    return (
        <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>Logged in as {currentUser.name}</Navbar.Text>
            <Form className="mb-0 ml-2" inline>
                <Button variant="outline-primary" onClick={handleLogout}>
                    Logout
                </Button>
            </Form>
        </Navbar.Collapse>
    )
}

export default CurrentUser
