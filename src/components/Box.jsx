import React from 'react'

function Box(props) {

    return (
        <div className='box' key={props.id}>
            <h3>{props.title}</h3>
            <h2>{props.info}</h2>
        </div>
    )
}

export default Box