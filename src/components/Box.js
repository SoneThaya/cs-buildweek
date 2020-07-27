import React from 'react'

const Box = ({selectBox, boxId, row, col}) => {
  

  return (
    <div className="boxClass" id={boxId} onClick={selectBox} />
      
  )
}

export default Box
