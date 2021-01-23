import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'

const Anecdote = ({ id, content, votes, handleClick }) => {
  return (
    <div key={id}>
      <div>{content}</div>
      <div>
        has {votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </div>
  )
}

const Anecdotes = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector((state) => state)
  const voteAnecdote = (id) => {
    dispatch(vote(id))
  }

  return (
    <div className="anecdotes">
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote, i) => (
        <Anecdote
          id={anecdote.id}
          key={anecdote.id + '-' + i}
          content={anecdote.content}
          votes={anecdote.votes}
          handleClick={() => voteAnecdote(anecdote.id)}
        />
      ))}
    </div>
  )
}

export default Anecdotes
