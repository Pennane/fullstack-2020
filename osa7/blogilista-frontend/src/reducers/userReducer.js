import userService from '../services/users'

const userReducer = (state = null, action) => {
    switch (action.type) {
        case 'SET_USERS':
            return action.payload
        case 'UPDATE_USER':
            return state.map((user) => (user.id === action.payload.id ? action.payload : user))
        case 'UNSET_USERS':
            return null
        default:
            return state
    }
}

export const initializeUsers = () => {
    return async (dispatch) => {
        const users = await userService.getAll()
        dispatch({
            type: 'SET_USERS',
            payload: users
        })
    }
}

export const updateUser = (id) => {
    return async (dispatch) => {
        const user = await userService.get(id)
        dispatch({
            type: 'UPDATE_USER',
            payload: user
        })
    }
}

export default userReducer
