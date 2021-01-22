import React, { useState, useImperativeHandle } from 'react'

const Togglable = React.forwardRef((props, ref) => {
  const buttonPlacement = props.buttonPlacement || 'after'

  const [visible, setVisible] = useState(props.initiallyOpen || false)

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
    <div className="togglable" id={props.id}>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility} className="toggleButton">
          {props.showLabel || 'show'}
        </button>
      </div>
      <div style={showWhenVisible} className="toggledContent">
        {buttonPlacement === 'before' && <button onClick={toggleVisibility}>{props.hideLabel || 'cancel'}</button>}
        {props.children}
        {buttonPlacement === 'after' && <button onClick={toggleVisibility}>{props.hideLabel || 'cancel'}</button>}
      </div>
    </div>
  )
})

export default Togglable
