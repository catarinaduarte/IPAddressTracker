import React, { useContext } from 'react';
import { FunctionForms, ClearInput } from '../App'


function Form() {

    const { handleChangeIP, searchData } = useContext(FunctionForms);
    const { searchIp } = useContext(ClearInput);

    return (
        <form className='form'>
            <input
                value={searchIp}
                onChange={handleChangeIP}
                type='text'
                placeholder='Search for any IP address or domain'
            />
            <button className='button-arrow' type="submit" onClick={(e) => searchData(e)}>
                <img src="/img/icon-arrow.svg" alt="arrow-icon" />
            </button>
        </form>
    )
}

export default Form