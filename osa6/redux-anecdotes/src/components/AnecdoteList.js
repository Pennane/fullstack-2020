import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { voteNotification, unset } from '../reducers/notificationReducer'

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
  const anecdotes = useSelector((state) => state.anecdotes)
  const filter = useSelector((state) => state.filter)

  const voteAnecdote = ({ id, content }) => {
    dispatch(vote(id))
    dispatch(voteNotification(content))
    setTimeout(() => {
      dispatch(unset())
    }, 5000)
  }

  return (
    <div className="anecdotes">
      {anecdotes
        .filter((anecdote) => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
        .map((anecdote, i) => (
          <Anecdote
            id={anecdote.id}
            key={anecdote.id + '-' + i}
            content={anecdote.content}
            votes={anecdote.votes}
            handleClick={() => voteAnecdote({ content: anecdote.content, id: anecdote.id })}
          />
        ))}
    </div>
  )
}

export default Anecdotes
