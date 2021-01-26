const initialState = {
    message: '',
    type: 'success',
    timeoutIds: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION_MESSAGE':
            return { ...state, message: action.payload.message, type: action.payload.type || 'success' }
        case 'UNSET_NOTIFICATION_MESSAGE':
            return { ...state, message: initialState.message, type: initialState.type }
        case 'REMOVE_TIMEOUT_IDS':
            return { ...state, timeoutIds: [] }
        case 'ADD_TIMEOUT_ID':
            return { ...state, timeoutIds: state.timeoutIds.concat(action.payload) }
        default:
            return state
    }
}

export const createNotification = (payload, duration) => {
    return async (dispatch, getState) => {
        dispatch({
            type: 'SET_NOTIFICATION_MESSAGE',
            payload: {
                message: payload.message,
                type: payload.type
            }
        })
        let prevTimeouts = getState().notification.timeoutIds
        dispatch({
            type: 'REMOVE_TIMEOUT_IDS'
        })
        let timeoutId = setTimeout(() => {
            dispatch({
                type: 'UNSET_NOTIFICATION_MESSAGE'
            })
        }, duration || 5000)
        dispatch({
            type: 'ADD_TIMEOUT_ID',
            payload: timeoutId
        })
    }
}

export default reducer
