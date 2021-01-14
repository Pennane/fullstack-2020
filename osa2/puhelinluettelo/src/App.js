import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Input = ({ text, value, handleChange, type }) => {
  return (
    <div>
      <label>
        <span>{text}:</span>
        <input type={type} value={value} onChange={handleChange} />
      </label>
    </div>
  )
}

const Form = ({ inputs, handleSubmit, heading, submitText }) => {
  return (
    <form onSubmit={handleSubmit}>
      <h2>{heading}</h2>
      {inputs.map((input, i) => (
        <Input key={i} type={input.type} text={input.text} value={input.value} handleChange={input.handleChange} />
      ))}
      {handleSubmit && <button type="submit">{submitText}</button>}
    </form>
  )
}

const PhoneNumber = ({ name, number }) => {
  return (
    <div>
      <span>
        {name} {number}
      </span>
    </div>
  )
}

const PhoneNumbers = ({ phonenumbers }) => {
  return (
    <div>
      {phonenumbers.map((person) => (
        <PhoneNumber name={person.name} number={person.number} key={person.name} />
      ))}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    console.log('effect')
    axios.get('http://localhost:3001/persons').then((res) => {
      console.log('promise resovled')
      setPersons(res.data)
    })
  }, [])

  const nameValid = (name) => !persons.some((person) => person.name === name)

  const addPerson = (event) => {
    event.preventDefault()
    if (nameValid(newName)) {
      setPersons(persons.concat({ name: newName, number: newNumber }))
      setNewName('')
      setNewNumber('')
    } else {
      alert(`${newName} is already added to phonebook`)
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value.toLowerCase())
  }

  const peopleToShow = filter ? persons.filter((person) => person.name.toLowerCase().includes(filter)) : persons

  return (
    <div>
      <h1>Phonebook</h1>
      <Form
        heading="Filter"
        inputs={[{ type: 'text', text: 'filter shown with', value: filter, handleChange: handleFilterChange }]}
      />
      <Form
        heading="Add new"
        handleSubmit={addPerson}
        submitText="add"
        inputs={[
          { type: 'text', text: 'name:', value: newName, handleChange: handleNameChange },
          { type: 'tel', text: 'number:', value: newNumber, handleChange: handleNumberChange }
        ]}
      />
      <h2>Numbers</h2>
      <PhoneNumbers phonenumbers={peopleToShow} />
    </div>
  )
}

export default App
