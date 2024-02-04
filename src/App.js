import { useState } from 'react';

function Square({ value, onSquareClick }) {
  // const [value, setValue] = useState(null);
  // function handleClick() {
  //   //console.log('clicked');
  //   setValue('X');
  // }

  return (
    <button className='square' onClick={onSquareClick}>
      {value}
    </button>
  );
}

export default function Board() {
  const [xIsNext, setXIsNext] = useState(true);

  const [squares, setSquares] = useState(Array(9).fill(null)); // Array(9).fill(null) creates an array of 9 nulls. This is the initial state of the squares array
  // const [squares, setSquares] = useState([null, null, null, null, null, null, null, null, null]); // This is the same as above
  // const [squares, setSquares] = useState(Array(9).fill('X')); // This is the same as above but with Xs instead of nulls

  function handleClick(i) {
    if (squares[i]) {
      // if the square already has a value, return early. This prevents a square from being changed after it has already been clicked
      // a simpler way to write this is: if (squares[i] !== null)
      return;
    }
    const nextSquares = squares.slice(); // squares.slice() creates a copy of the squares array to modify instead of modifying the existing array
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  return (
    // here we create the board with 9 squares. Each square has a value and an onClick event handler.
    // The onClick event handler calls the handleClick function and passes the index of the square as an argument.
    // The handleClick function then creates a copy of the squares array and modifies the copy instead of the original array.

    <>
      <div className='board-row'>
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className='board-row'>
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className='board-row'>
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]; // here we use destructuring to assign values from the lines array to variables a, b, and c. This is the same as writing const a = lines[i][0]; const b = lines[i][1]; const c = lines[i][2];
    if (squares[a] && (squares[a] === squares[b]) === squares[c]) {
      // here we check if the squares array has a value at index a and if the value at index a is equal to the value at index b and if the value at index a is equal to the value at index c
      // if the above condition is true, we return the value at index a. This means that if the value at index a is equal to the value at index b and the value at index c, we return the value at index a
      // if the value at index a is not equal to the value at index b and the value at index c, we return null
      // if the value at index a is null, we return null

      return squares[a];
    }
  }
  return null;
}
