import React, { useState, useImperativeHandle } from 'react'
import { Button } from 'react-bootstrap'

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
                <Button onClick={toggleVisibility} className="toggleButton">
                    {props.showLabel || 'show'}
                </Button>
            </div>
            <div style={showWhenVisible} className="toggledContent">
                {buttonPlacement === 'before' && (
                    <Button variant="danger" onClick={toggleVisibility}>
                        {props.hideLabel || 'cancel'}
                    </Button>
                )}
                {props.children}
                {buttonPlacement === 'after' && (
                    <Button variant="danger" onClick={toggleVisibility}>
                        {props.hideLabel || 'cancel'}
                    </Button>
                )}
            </div>
        </div>
    )
})

export default Togglable
