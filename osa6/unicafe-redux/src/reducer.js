const initialState = {
  good: 0,
  neutral: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'INCREMENT_GOOD':
      return { ...state, good: state.good + 1 }
    case 'INCREMENT_NEUTRAL':
      return { ...state, neutral: state.neutral + 1 }
    case 'INCREMENT_BAD':
      return { ...state, bad: state.bad + 1 }
    case 'RESET_STATE':
      return initialState
    default:
      return state
  }
}

export default counterReducer
