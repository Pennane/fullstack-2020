const initialState = {
  text: '',
  timeoutIds: []
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_MESSAGE':
      return { ...state, text: action.payload }
    case 'REMOVE':
      return { ...state, text: initialState.text }
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
      type: 'SET_MESSAGE',
      payload: payload
    })
    let prevTimeouts = getState().notification.timeoutIds
    prevTimeouts.forEach((id) => clearTimeout(id))
    dispatch({
      type: 'REMOVE_TIMEOUT_IDS'
    })
    let timeoutId = setTimeout(() => {
      dispatch({
        type: 'REMOVE'
      })
    }, duration || 5000)
    dispatch({
      type: 'ADD_TIMEOUT_ID',
      payload: timeoutId
    })
  }
}
export default reducer
