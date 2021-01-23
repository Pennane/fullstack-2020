import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'

const CreateAnecdote = () => {
  const dispatch = useDispatch()

  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.new_anecdote_text.value
    dispatch(createAnecdote(content))
  }
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input type="text" name="new_anecdote_text" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default CreateAnecdote
