import React from 'react'
import { login } from '../reducers/loginReducer'
import { createNotification } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'
import { useField } from '../hooks/index'
import { Form, Button } from 'react-bootstrap'

const LoginForm = () => {
    const dispatch = useDispatch()
    const { reset: resetUsername, ...username } = useField({ name: 'username', type: 'text' })
    const { reset: resetPassword, ...password } = useField({ name: 'password', type: 'password' })

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            let userObject = {
                username: event.target.username.value,
                password: event.target.password.value
            }
            dispatch(login(userObject))
            dispatch(createNotification({ message: `Logged in as '${userObject.username}'` }, 5000))
        } catch (exception) {
            dispatch(createNotification({ message: `Login failed. Check username and password`, type: 'error' }, 5000))
        } finally {
            resetUsername()
            resetPassword()
        }
    }

    return (
        <Form className="loginform" inline onSubmit={handleLogin}>
            <Form.Group>
                <Form.Label htmlFor="username" srOnly>
                    Username
                </Form.Label>
                <Form.Control placeholder="username" className="mr-sm-2" id="username" {...username} />
            </Form.Group>
            <Form.Group>
                <Form.Label htmlFor="password" srOnly>
                    Password
                </Form.Label>
                <Form.Control placeholder="password" className="mr-sm-2" id="password" {...password} />
            </Form.Group>
            <Button type="submit">Log in</Button>
        </Form>
    )
}

export default LoginForm
