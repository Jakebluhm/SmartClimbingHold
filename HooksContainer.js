import React, { useState } from 'react';




const HooksContainer = () => {

  const [value, setValue] = useState(0)

  const incrementValue = () => {
    setValue(value + 1 )
  }

  const decrementValue = () => {
    setValue(value - 1 )
  }

    return(
      <div>
        <button onClick={() => incrementValue()}> Add Local Value </button>
        <button onClick={() => decrementValue()}> Dec Local Value </button>
        <br />
        <div>
          Local React State: {value}
        </div>
      </div>
    )
}


export default HooksContainer;