import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'

export default function InputBox(props){
    InputBox.propTypes = {
            data: PropTypes.any,
        }
    
    return <span className="label-cls">{parseInt(props.data,10)  > 0 ? "Please enter the next number: " : "Please enter a number for your frequence:(in seconds)"}</span>
}
