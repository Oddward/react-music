// import React from 'react'

function ControlButton( props ) {
    return(
        <button
            id={props.id} 
            className="control-butt round" 
            onClick={props.onClick}>
                {props.children}
        </button>
    )
}

export default ControlButton