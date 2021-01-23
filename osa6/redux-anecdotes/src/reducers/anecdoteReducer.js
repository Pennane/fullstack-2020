const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

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

const initialState = anecdotesAtStart.map(asObject)

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CREATE':
      const anecdote = action.data
      return [...state, anecdote]
    case 'VOTE':
      const id = action.data.id
      const toChange = state.find((a) => a.id === id)
      const updated = {
        ...toChange,
        votes: toChange.votes + 1
      }
      console.log('bef0re')
      console.log([...state])
      console.log('after')
      console.log(sortAnecdotes([...state]))

      return sortAnecdotes(state.map((a) => (a.id === id ? updated : a)))
    default:
  }

  return state
}

export const createAnecdote = (anecdote) => {
  return {
    type: 'CREATE',
    data: asObject(anecdote)
  }
}

export const vote = (id) => {
  return {
    type: 'VOTE',
    data: { id }
  }
}

export default reducer
