import * as React from 'react'
import PropTypes from 'prop-types'

export default function Button(props){
    Button.propTypes = {
              item: PropTypes.object,
              onClickHandlker: PropTypes.func,
  }

  return (<button className='button' 
                onClick={() => props.onClickHandlker()}>{props.item.name}</button>
  )
}