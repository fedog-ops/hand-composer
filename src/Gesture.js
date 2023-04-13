//connection to djanjo server with ML to change coordinates to hand gesture

import React, { useState, useEffect } from 'react';

const Gesture = ({coords}) => {
const [returnedData, setReturnedData] = useState([])
    useEffect(() => {
        fetch("/analyze", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({data: coords})
        }).then(
          res=> res.json()
        ).then(
          data => {
            
            setReturnedData(data.result.data)

          }
        )
      }, [coords]);
  return (
    <div>
  {(returnedData.length>0) ? returnedData.map(coord => {
       return (<div>{coord.x}, ____________________       {coord.y}, ____________________       {coord.z}</div>)
       }) : <h4>wating for server</h4>}

    </div>
  )
}

export default Gesture