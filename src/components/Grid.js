import React from 'react'
import Box from './Box'

const Grid = ({gridFull, rows, cols, selectBox}) => {
  const width = cols * 14
  let rowsArr = []
  let boxClass = "";

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      let boxId = i + "_" + j;

      let boxClass = gridFull[i][j] ? "square on" : "square off";
      rowsArr.push(
        <Box
          boxClass={boxClass}
          key={boxId}
          boxId={boxId}
          row={i}
          col={j}
          selectBox={selectBox}
        />


      )
    }
  }


  return (
    <div className="grid" style={{width: width}}>
      {rowsArr}
    </div>
  )
}

export default Grid
