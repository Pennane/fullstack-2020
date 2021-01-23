import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { createNotification, unset } from '../reducers/notificationReducer'

const CreateAnecdote = () => {
  const dispatch = useDispatch()

  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.new_anecdote_text.value
    dispatch(createAnecdote(content))
    dispatch(createNotification(content))
    setTimeout(() => {
      dispatch(unset())
    }, 5000)
  }

  const style = {
    marginBottom: 20
  }
  return (
    <div style={style}>
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
