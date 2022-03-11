import React from 'react';
import Form from './Form';

function Header() {
    
  return (
    <div className='img-Container'>
        <h1 className='title-app'>IP Address Tracker</h1>
        <Form />

        {/* <form className='form'>
        <input
            value={props.value}
            onChange={props.handleChangeIP}
            type='text'
            placeholder='Search for any IP address or domain'
        />
        <button className='button-arrow' type="submit" onClick={(e) => props.searchData(e)}>
            <img src="/img/icon-arrow.svg" alt="arrow-icon" />
        </button>
    </form> */}
  </div>
  )
}

export default Header