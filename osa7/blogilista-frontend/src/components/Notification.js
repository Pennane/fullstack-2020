import React from 'react'

const Notification = ({ name, message, type }) => {
  return (
    <div className="notificationWrapper">
      <div className={`notification ${type}`}>
        <p>
          <span className="name">{name}</span> {message && <span className="message">: {message}</span>}
        </p>
      </div>
    </div>
  )
}

export default Notification
