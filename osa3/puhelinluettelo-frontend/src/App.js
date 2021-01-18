import React, { useState, useEffect } from 'react'
import numberService from './services/number'

const Notification = ({ name, message, type }) => {
  return (
    <div className={`notification ${type}`}>
      <span className="name">{name}</span>
      {message && <span className="message">{message}</span>}
    </div>
  )
}

const Input = ({ id, text, value, handleChange, type }) => {
  return (
    <tr>
      <td>
        <label htmlFor={id}>
          <span>{text}</span>
        </label>
      </td>
      <td>
        <input id={id} type={type} value={value} onChange={handleChange} />
      </td>
    </tr>
  )
}

const Form = ({ inputs, handleSubmit, heading, submitText }) => {
  return (
    <form onSubmit={handleSubmit}>
      <h2>{heading}</h2>
      <table>
        <tbody>
          {inputs.map((input, i) => (
            <Input
              key={input.text + i}
              id={input.text + i}
              type={input.type}
              text={input.text}
              value={input.value}
              handleChange={input.handleChange}
            />
          ))}
        </tbody>
      </table>

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
  const [notificationName, setNotificationName] = useState('')
  const [notificationMessage, setNotificationMessage] = useState('')
  const [notificationType, setNotificationType] = useState('')

  const notify = ({ name, message, type }) => {
    setNotificationMessage(message)
    setNotificationName(name)
    setNotificationType(type)
    setTimeout(() => {
      setNotificationMessage(null)
      setNotificationName(null)
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
          name: `Added a number for ' ${newName} '`,
          type: `success`
        })
        setNewName('')
        setNewNumber('')
      })
      .catch((err) => {
        notify({
          name: `Failed to add info for ' ${newName} '`,
          message: err?.response?.data?.error,
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
          name: `Updated number for ' ${person.name} '`,
          type: `success`
        })
        setNewName('')
        setNewNumber('')
      })
      .catch((err) => {
        notify({
          name: `Failed to update info for ' ${person.name} '`,
          message: err?.response?.data?.error,
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
          name: `Removed number for ' ${person.name} '`,
          type: `success`
        })
        updateAll()
      })
      .catch((err) => {
        notify({
          name: `Failed to delete data for ' ${person.name} '`,
          message: err?.response?.data?.error,
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
      <Notification name={notificationName} message={notificationMessage} type={notificationType} />
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
