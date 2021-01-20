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

const Form = ({ inputs, handleSubmit, heading, submitText }) => {
  return (
    <form onSubmit={handleSubmit}>
      <h2>{heading}</h2>
      <table>
        <tbody>
          {inputs.map((input, i) => (
            <Input
              key={i}
              id={input.text + '-' + i}
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

export default Form
