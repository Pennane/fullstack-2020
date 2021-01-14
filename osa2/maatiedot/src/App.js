import React, { useState, useEffect } from 'react'
import axios from 'axios'

const COUNTRIES_API_URL = 'https://restcountries.eu/rest/v2'
const WEATHER_API_URL = 'http://api.weatherstack.com/'
const WEATHER_API_KEY = process.env.REACT_APP_API_KEY
// weatherstack api hakee sään Helsingille

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

const Form = ({ inputs, handleSubmit, submitText }) => {
  return (
    <form onSubmit={handleSubmit}>
      {inputs.map((input, i) => (
        <Input key={i} type={input.type} text={input.text} value={input.value} handleChange={input.handleChange} />
      ))}
      {handleSubmit && <button type="submit">{submitText}</button>}
    </form>
  )
}

const Weather = ({ weather }) => {
  const { current, location } = weather
  return (
    <div>
      <h3>Weather in {location.name}</h3>
      <p>Temperature: {current.temperature}°C</p>
      {current.weather_icons.map((icon, i) => (
        <img alt="weather-icon" src={icon} key={i} height="50" />
      ))}
      <p>
        Wind: {current.wind_speed}mph direction {current.wind_dir}
      </p>
    </div>
  )
}

const Country = ({ country }) => {
  return (
    <div>
      <h2>{country.name}</h2>
      <img alt={`Flag of ${country.name}`} src={country.flag} height="70" />
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h3>Spoken languages</h3>
      <ul>
        {country.languages.map((lang) => (
          <li key={lang.name}>{lang.name}</li>
        ))}
      </ul>
      {country.weather && <Weather weather={country.weather} />}
    </div>
  )
}

const CountryName = ({ name, handleSubmit }) => {
  return (
    <p>
      {name}
      <button onClick={() => handleSubmit(name)}>show</button>
    </p>
  )
}

const Countries = ({ countries, showFuction }) => {
  let output
  if (countries.length > 10) {
    output = <p>Too many matches, specify more elaborate filter.</p>
  } else if (countries.length === 1) {
    output = <Country country={countries[0]} />
  } else {
    output = countries.map((country) => (
      <CountryName handleSubmit={showFuction} name={country.name} key={country.name} />
    ))
  }

  return output
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const handleShowClick = (name) => {
    setFilter(name)
  }

  const filteredCountries = countries.filter((country) => country.name.toLowerCase().includes(filter.toLowerCase()))

  useEffect(async () => {
    axios.get(`${COUNTRIES_API_URL}/all`).then((res) => {
      console.log('promise resovled')
      setCountries(res.data)
    })
  }, [])

  useEffect(() => {
    let finlandIndex
    countries.forEach((country, i) => {
      if (country.name === 'Finland') {
        return (finlandIndex = i)
      }
    })
    if (!finlandIndex) return
    if (countries[finlandIndex].weather) return
    let _countries = [...countries]
    axios.get(`${WEATHER_API_URL}/current?access_key=${WEATHER_API_KEY}&query=Helsinki`).then((res) => {
      _countries[finlandIndex].weather = res.data
      setCountries(_countries)
    })
  }, [countries])

  return (
    <div>
      <Form inputs={[{ text: 'find coutries', value: filter, handleChange: handleFilterChange }]} />
      <Countries countries={filteredCountries} showFuction={handleShowClick} />
    </div>
  )
}

export default App
