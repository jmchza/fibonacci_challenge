import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'

const ENTER_KEY = 13;

export default function InputBox(props){
    InputBox.propTypes = {
            data: PropTypes.any,
            changeHandler: PropTypes.func,
            startHandler:PropTypes.func,
            label: PropTypes.string.isRequired,
            isRunning: PropTypes.bool
        }
    
    const [value, setValue] = useState(props.value)
    const [run, setRun] = useState(props.isRunning)
    
    useEffect(() => {setValue(props.data)}, [props.data])
    useEffect(()=> {setRun(!props.isRunning)}, [props.isRunning])

    // function handleKeyDown( e) {
        
    //     if (e.keyCode === ENTER_KEY) {
    //         if(run) {
    //             props.startHandler()
    //         }else{
                
    //         }
    //         setValue('')
    //     }
    // }

    return (<div>
            <label>{props.label}</label>
            <input type='text' value={value}
                id="theInput" 
                onKeyDown={() => props.startHandler()}></input>
        </div>
        )
}
