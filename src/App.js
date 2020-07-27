import React, { useState, useCallback, useRef, useEffect } from 'react';
import './App.css';
import produce from 'immer'


const numRows = 50;
const numCols = 50;

const operations = [
  [0, 1],
  [0, -1],
  [1, -1],
  [-1, 1],
  [-1, -1],
  [1, 1],
  [1, 0],
  [-1, 0],
]

const generateEmptyGrid = () => {
  const rows = [];
    for (let i = 0; i < numRows; i++) {
      rows.push(Array.from(Array(numCols), () => 0))
    }
    return rows
}


function App() {
  const [generations, setGenerations] = useState(0)
  const [running, setRunning] = useState(false)
  const [grid, setGrid] = useState(() => {
    return generateEmptyGrid()
  })

  
  const runningRef = useRef(running);
  runningRef.current = running

  const runSimulation = useCallback(() => {
    if (!runningRef.current) {
      
      return
    }
    
    setGrid((g) => {
      return produce(g, gridCopy => {
        for (let i = 0; i < numRows; i++) {
          for (let j = 0; j < numCols; j++) {
            // figures out how many neighbors current grid has
            let neighbors = 0;
            operations.forEach(([x, y]) => {
              const newI = i + x;
              const newJ = j + y;
              if (newI >= 0 && newI < numRows && newJ >= 0 && newJ < numCols) {
                neighbors += g[newI][newJ]
              }
            })

            if (neighbors < 2 || neighbors > 3) {
              gridCopy[i][j] = 0;
              
            } else if (g[i][j] === 0 && neighbors === 3) {
              gridCopy[i][j] = 1;
              
            }
          }
        }
      })
    })
    
    setTimeout(runSimulation, 500)
  }, [])

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setGenerations(prevGen => prevGen + 1)
  //   }, 500)
  //   return () => {
  //     clearInterval(timer)
  //   }
  // }, [])

  return (
    <div className="App">
      <h1>conway's game of life</h1>
      <button onClick={() => {
        setRunning(!running);
        if (!running) {
          runningRef.current = true;
          runSimulation();
        }
      }}>{running ? 'stop' : 'start'}</button>

      <button
        onClick={() => { setGrid(generateEmptyGrid()) }}>
        clear
      </button>

      <button
        onClick={() => {
          const rows = [];
          for (let i = 0; i < numRows; i++) {
            rows.push(Array.from(Array(numCols), () => Math.random() > 0.75 ? 1 : 0))
          }
          setGrid(rows)
        }}>
        random
      </button>

      <div className="grid">
      {grid.map((rows, i) => 
        rows.map((col, j) => (
          <div
            key={`${i}-${j}`}
            onClick={() => {
              const newGrid = produce(grid, gridCopy => {
                gridCopy[i][j] = grid[i][j] ? 0 : 1;
              })
              setGrid(newGrid)
            }}
            style={{
              width: 15,
              height: 15,
              backgroundColor: grid[i][j] ? 'red' : undefined,
              border: "solid 1px black"
            }}
          />
        ))
        )}
        </div>
      <h2>Generations: {generations}</h2>
    </div>
  );
}

export default App;
