import React, {useState, useRef} from 'react'
import PropTypes from 'prop-types'
import Form from 'react-bootstrap/Form'

export default function Input(props){
    const inputElement = useRef(null)
    Input.propTypes = {
            isRunning: PropTypes.bool,
            disabled: PropTypes.bool,
            onKeyChange: PropTypes.func,
            updateState: PropTypes.func
        }
    
    function handleKeyDown ( e) {
      console.log(e.key)
      
      if (e.key === "Enter") {
        
        if(!props.isRunning) {
          props.startCounter({
            isRunning: !props.isRunning, 
            frequence: parseInt(e.key, 10)
          })
        }else{
          if(Number.isInteger(parseInt(e.key))){
            let obj = props.numbers
            obj[e.key] = e.key in obj ? (1+ obj[e.key]) : 1
            
            props.updateState({numbers: obj, lastEntry: e.key});
          }
        }
        console.log('inputElement',inputElement)
        inputElement.current.value = ''
      }
    }

    return (
            <Form.Group controlId="formBasicEmail">
                <Form.Label>{
                  props.numbers.length  > 0 ? "Please enter the next number: " 
                      : "Please enter a number for your frequence:(in seconds)"}</Form.Label>
                <Form.Control type="input" placeholder="Enter number" ref={inputElement}
                  onKeyPress={handleKeyDown}
                  disabled={props.disabled}/>
            </Form.Group>
        )
}
