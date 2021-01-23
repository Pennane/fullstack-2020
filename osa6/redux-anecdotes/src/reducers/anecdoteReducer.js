import anecdoteService from '../services/anecdotes'

const sortAnecdotes = (anecdotes) =>
  anecdotes.sort((a, b) => {
    if (a.votes < b.votes) {
      return 1
    } else if (a.votes > b.votes) {
      return -1
    } else {
      return 0
    }
  })

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT':
      return sortAnecdotes(action.payload)
    case 'CREATE':
      return [...state, action.payload]
    case 'UPDATE':
      const updated = action.payload
      return sortAnecdotes(state.map((a) => (a.id === updated.id ? updated : a)))
    default:
      return state
  }
}

export const init = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT',
      payload: anecdotes
    })
  }
}

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'CREATE',
      payload: newAnecdote
    })
  }
}

export const vote = (id) => {
  return async (dispatch) => {
    const anecdote = await anecdoteService.vote(id)
    dispatch({
      type: 'UPDATE',
      payload: anecdote
    })
  }
}

export default reducer
