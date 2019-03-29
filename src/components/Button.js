import * as React from 'react'
import PropTypes from 'prop-types'

export default function Button(props){
    Button.propTypes = {
              item: PropTypes.object,
              onClickHandlker: PropTypes.func,
              isEnable: PropTypes.bool
  }

  return (<button className={props.isEnable ? 'button' : 'disable_botton'} disabled={!props.isEnable}
                onClick={() => props.onClickHandlker()}>{props.item.name}</button>
  )
}