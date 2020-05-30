import React, { useState, useEffect } from 'react'

function Inputs() {

const [ data, setData ] = useState([])

    useEffect(() => {
        fetch('/inputs')
        .then(res => res.json())
        .then(setData)
    }, [])

    console.log(data)

    return(
        <ul>
            {data.map((item,i) => 
                <li key={i}>{item.name}</li>
            )}
        </ul>
    )

}

export default Inputs