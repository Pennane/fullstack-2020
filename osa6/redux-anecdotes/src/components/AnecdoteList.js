import React from 'react'
import { connect } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { createNotification } from '../reducers/notificationReducer'

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

const Anecdotes = ({ anecdotes, filter, ...props }) => {
  const voteAnecdote = ({ id, content }) => {
    props.vote(id)
    props.createNotification(`Created an anecdote '${content}'`, 5000)
  }

  return (
    <div className="anecdotes">
      {anecdotes &&
        anecdotes
          .filter((anecdote) => anecdote.content && anecdote.content.toLowerCase().includes(filter.toLowerCase()))
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

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter
  }
}

const ConnectedAnecdotes = connect(mapStateToProps, {
  createNotification,
  vote
})(Anecdotes)

export default ConnectedAnecdotes
