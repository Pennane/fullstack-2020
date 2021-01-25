import React from 'react'
import { logout } from '../reducers/loginReducer'
import { useSelector, useDispatch } from 'react-redux'

const CurrentUser = () => {
    const dipatch = useDispatch()
    const currentUser = useSelector((state) => state.currentUser)
    const handleLogout = () => {
        dipatch(logout())
    }
    return (
        <span>
            <span>Logged in as {currentUser.name}</span>
            <button onClick={handleLogout}>Log out</button>
        </span>
    )
}

export default CurrentUser
