import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeWithToken } from './reducers/loginReducer'
import { initializeUsers } from './reducers/userReducer'
import { initializeBlogs } from './reducers/blogReducer'

import RouterView from './router/routes'

import Navigation from './components/Navigation'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'

const App = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedUser')
        if (loggedUserJSON) {
            dispatch(initializeWithToken(JSON.parse(loggedUserJSON)))
        }
        dispatch(initializeUsers())
        dispatch(initializeBlogs())
    }, [dispatch])

    const user = useSelector((state) => state.currentUser)

    if (user === null) {
        return (
            <div>
                <h1>Blogs</h1>
                <Notification />
                <LoginForm />
            </div>
        )
    }

    return (
        <div>
            <Navigation />
            <Notification />
            <RouterView />
        </div>
    )
}

export default App
