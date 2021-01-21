import React, { useState, useImperativeHandle } from 'react'

const Togglable = React.forwardRef((props, ref) => {
  const buttonPlacement = props.buttonPlacement || 'after'

  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.showLabel || 'show'}</button>
      </div>
      <div style={showWhenVisible}>
        {buttonPlacement === 'before' && <button onClick={toggleVisibility}>{props.hideLabel || 'cancel'}</button>}
        {props.children}
        {buttonPlacement === 'after' && <button onClick={toggleVisibility}>{props.hideLabel || 'cancel'}</button>}
      </div>
    </div>
  )
})

export default Togglable
