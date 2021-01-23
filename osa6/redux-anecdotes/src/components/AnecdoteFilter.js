import React from 'react'
import { useDispatch } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'

const CreateAnecdote = () => {
  const dispatch = useDispatch()

  const pushFilter = (event) => {
    event.preventDefault()
    const filter = event.target.value
    dispatch(setFilter(filter))
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

export default CreateAnecdote
