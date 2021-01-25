import React from 'react'
import Togglable from './Togglable'
import { login } from '../reducers/loginReducer'
import { useDispatch } from 'react-redux'

const LoginForm = () => {
    const dispatch = useDispatch()

    const handleLogin = (event) => {
        event.preventDefault()

        let userObject = {
            username: event.target.username.value,
            password: event.target.password.value
        }

        dispatch(login(userObject))
    }

    return (
        <Togglable id="login" showLabel="Log in" initiallyOpen={true}>
            <form onSubmit={handleLogin}>
                <input text="username" name="username" type="text" id="username" />
                <input text="password" name="password" type="password" id="password" />
                <button type="submit">Log in</button>
            </form>
        </Togglable>
    )
}

export default LoginForm
