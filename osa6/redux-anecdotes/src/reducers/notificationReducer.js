const initialState = {
  text: ''
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_MESSAGE':
      return { ...state, text: action.payload }
    case 'REMOVE':
      return { ...state, text: initialState.text }
    default:
      return state
  }
}

export const unset = () => {
  return {
    type: 'REMOVE'
  }
}

export const voteNotification = (payload) => {
  return {
    type: 'SET_MESSAGE',
    payload: `You voted '${payload}'`
  }
}

export const createNotification = (payload) => {
  return {
    type: 'SET_MESSAGE',
    payload: `You added a blog '${payload}'`
  }
}
export default reducer
