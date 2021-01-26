import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
    const { message, type } = useSelector((state) => state.notification)
    if (!message) return null
    return (
        <div className="notificationWrapper">
            <div className={`notification ${type}`}>
                <p>
                    <span className="name">{message}</span>
                </p>
            </div>
        </div>
    )
}

export default Notification
