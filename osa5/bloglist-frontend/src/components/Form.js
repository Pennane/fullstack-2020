import React from 'react'
import PropTypes from 'prop-types'

const Input = ({ id, text, value, handleChange, type }) => {
  return (
    <tr>
      <td>
        {text && (
          <label htmlFor={id}>
            <span>{text}</span>
          </label>
        )}
      </td>
      <td>
        <input id={id} type={type} value={value} onChange={handleChange} />
      </td>
    </tr>
  )
}

Input.propTypes = {
  id: PropTypes.string.isRequired,
  text: PropTypes.string,
  value: PropTypes.any.isRequired,
  handleChange: PropTypes.func.isRequired
}

const Form = ({ handleSubmit, heading, submitText, children }) => {
  return (
    <form onSubmit={handleSubmit}>
      {heading && <h2>{heading}</h2>}
      <table>
        <tbody>{children}</tbody>
      </table>

      {handleSubmit && <button type="submit">{submitText}</button>}
    </form>
  )
}

Form.propTypes = {
  handleSubmit: PropTypes.func,
  heading: PropTypes.string,
  submitText: PropTypes.string
}

export { Form, Input }
