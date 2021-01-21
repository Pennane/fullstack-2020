import React from 'react'

const Notification = ({ name, message, type }) => {
  return (
    <div className={`notification ${type}`}>
      <p>
        <span className="name">{name}</span> {message && <span className="message">: {message}</span>}
      </p>
    </div>
  )
}

export default Notification
