import React from 'react'
import { connect } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'

const AnecdoteFilter = (props) => {
  const pushFilter = (event) => {
    event.preventDefault()
    const filter = event.target.value
    props.setFilter(filter)
  }
  return (
    <div>
      <h2>Filter</h2>
      <form>
        <div>
          <input type="text" name="filter" onChange={pushFilter} />
        </div>
      </form>
    </div>
  )
}

const ConnectedAnecdoteFilter = connect(null, { setFilter })(AnecdoteFilter)

export default ConnectedAnecdoteFilter
