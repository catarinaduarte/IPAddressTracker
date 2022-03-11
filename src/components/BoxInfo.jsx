import React from 'react'
import Box from './Box'

function BoxInfo(props) {

    const titlesInfo = [
        {   
            "key": 1,
            "title": "IP ADDRESS",
            "info": props.ip
        },
        {
            "key": 2,
            "title": 'LOCATION',
            "info": props.location
        },
        {
            "key": 3,
            "title": 'TIMEZONE',
            "info": props.timezone
        },
        {
            "key":4,
            "title": 'ISP',
            "info": props.isp
        }
    ]

    return (
        <div className='container-info'>
            <div className='boxes'>
                {titlesInfo.map(data => <Box {...data} />)}
            </div>
        </div>
    )
}

export default BoxInfo