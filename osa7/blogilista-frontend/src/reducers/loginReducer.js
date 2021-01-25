import loginService from '../services/login'
import blogService from '../services/blogs'

const loginReducer = (state = null, action) => {
    switch (action.type) {
        case 'SET_CURRENT_USER':
            return action.payload
        case 'UNSET_CURRENT_USER':
            return null
        default:
            return state
    }
}

export const initializeWithToken = (currentUser) => {
    return async (dispatch) => {
        blogService.setToken(currentUser.token)
        dispatch({
            type: 'SET_CURRENT_USER',
            payload: currentUser
        })
    }
}

export const login = (content) => {
    return async (dispatch) => {
        const currentUser = await loginService.login(content)
        window.localStorage.setItem('loggedUser', JSON.stringify(currentUser))
        blogService.setToken(currentUser.token)
        dispatch({
            type: 'SET_CURRENT_USER',
            payload: currentUser
        })
    }
}

export const logout = (content) => {
    return async (dispatch) => {
        blogService.setToken(null)
        window.localStorage.removeItem('loggedUser')
        dispatch({
            type: 'UNSET_CURRENT_USER'
        })
    }
}

export default loginReducer
