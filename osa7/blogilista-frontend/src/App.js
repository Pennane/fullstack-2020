import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeWithToken } from './reducers/loginReducer'
import { initializeUsers } from './reducers/userReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { Container } from 'react-bootstrap'

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

    return (
        <div>
            <Navigation />
            <Notification />
            {user && (
                <Container className="router-view">
                    <h1>Blog app</h1>
                    <RouterView />
                </Container>
            )}
            {!user && (
                <Container>
                    <h1>Blogs app</h1>
                    <LoginForm />
                </Container>
            )}
        </div>
    )
}

export default App
