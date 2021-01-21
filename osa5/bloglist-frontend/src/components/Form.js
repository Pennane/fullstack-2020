import React from 'react'

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

const Form = ({ handleSubmit, heading, submitText, children }) => {
  return (
    <form onSubmit={handleSubmit}>
      <h2>{heading}</h2>
      <table>
        <tbody>{children}</tbody>
      </table>

      {handleSubmit && <button type="submit">{submitText}</button>}
    </form>
  )
}

export { Form, Input }
