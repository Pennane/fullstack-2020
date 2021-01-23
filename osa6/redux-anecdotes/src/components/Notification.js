import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const { text } = useSelector((state) => state.notification)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    minHeight: 30,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  }
  return <div style={style}>{text}</div>
}

export default Notification
