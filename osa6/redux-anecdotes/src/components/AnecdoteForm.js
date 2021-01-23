import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { createNotification } from '../reducers/notificationReducer'

const CreateAnecdote = (props) => {
  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.new_anecdote_text.value
    props.createAnecdote(content)
    props.createNotification(`Voted '${content}'`, 5000)
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

const ConnectedCreateAnecdote = connect(null, { createAnecdote, createNotification })(CreateAnecdote)

export default ConnectedCreateAnecdote
