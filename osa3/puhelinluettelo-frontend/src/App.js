import React, { useState, useEffect } from 'react'
import numberService from './services/number'

const Notification = ({ message, type }) => {
  return (
    <div className={`notification ${type}`}>
      <span>{message}</span>
    </div>
  )
}

const Input = ({ text, value, handleChange, type }) => {
  return (
    <div>
      <label>
        <span>{text}</span>
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

const PhoneNumber = ({ name, number, id, clickHandler }) => {
  return (
    <tr>
      <td>{name}</td>
      <td>{number}</td>
      <td>
        <button onClick={() => clickHandler(id)}>Remove</button>
      </td>
    </tr>
  )
}

const PhoneNumbers = ({ phonenumbers, clickHandler }) => {
  return (
    <table>
      <tbody>
        {phonenumbers.map((person) => (
          <PhoneNumber
            name={person.name}
            number={person.number}
            id={person.id}
            key={person.name}
            clickHandler={clickHandler}
          />
        ))}
      </tbody>
    </table>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState('')
  const [notificationType, setNotificationType] = useState('')

  const notify = ({ message, type }) => {
    setNotification(message)
    setNotificationType(type)
    setTimeout(() => {
      setNotification(null)
      setNotificationType(null)
    }, 5000)
  }

  const isPresent = (name) => persons.find((person) => person.name === name)

  const updateAll = () => {
    numberService.getAll().then((numbers) => {
      setPersons(numbers)
    })
  }

  useEffect(() => {
    updateAll()
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    const personObject = {
      name: newName.trim(),
      number: newNumber.trim()
    }

    let presentPerson = isPresent(newName)

    if (presentPerson) return updatePerson(presentPerson, personObject)

    numberService
      .add(personObject)
      .then((numbers) => {
        setPersons(persons.concat(numbers))
        notify({
          message: `Added a new number for ${newName}`,
          type: `success`
        })
        setNewName('')
        setNewNumber('')
      })
      .catch((err) => {
        notify({
          message: `Failed to add info for ${newName}`,
          type: `error`
        })
        updateAll()
      })
  }

  const updatePerson = (person, newObject) => {
    numberService
      .update(person.id, newObject)
      .then((updated) => {
        setPersons(persons.map((_person) => (_person.id === person.id ? updated : _person)))
        notify({
          message: `Updated number for ${person.name}`,
          type: `success`
        })
        setNewName('')
        setNewNumber('')
      })
      .catch((err) => {
        notify({
          message: `Info for ${person.name} had been deleted before update`,
          type: `error`
        })
        updateAll()
      })
  }

  const deletePerson = (id) => {
    let person = persons.find((person) => person.id === id)
    if (!window.confirm('Do you really want to remove the person from phonebook?')) return
    numberService
      .remove(id)
      .then(() => {
        notify({
          message: `Removed ${person.name}'s number`,
          type: `success`
        })
        updateAll()
      })
      .catch((err) => {
        notify({
          message: `Information of ${person.name} had already been removed`,
          type: `error`
        })
        updateAll()
      })
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
      <Notification message={notification} type={notificationType} />
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
      <PhoneNumbers phonenumbers={peopleToShow} clickHandler={deletePerson} />
    </div>
  )
}

export default App
