import React from 'react'
import Form from './Form'

const createBlog = ({ handleSubmit, submitValues }) => {
  return (
    <Form
      heading="Create new"
      handleSubmit={handleSubmit}
      submitText="Add new blog"
      inputs={[
        {
          type: 'text',
          text: 'title',
          value: submitValues.title.value,
          handleChange: (event) => submitValues.title.setter(event.target.value)
        },
        {
          type: 'text',
          text: 'author',
          value: submitValues.author.value,
          handleChange: (event) => submitValues.author.setter(event.target.value)
        },
        {
          type: 'text',
          text: 'url',
          value: submitValues.url.value,
          handleChange: (event) => submitValues.url.setter(event.target.value)
        }
      ]}
    />
  )
}
export default createBlog
