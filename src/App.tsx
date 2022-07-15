import React, {useState} from 'react';
import './App.css';

// an interface defines what the named object looks like
interface SquareProps extends React.HTMLAttributes<HTMLButtonElement> {
  // extends means this interfaces extends an existing interface

  // value is optional hence the ? before the colon (TS uses ? if something can be null)
  value?: 'X' | 'O';
}

// Square: React.FC<SquareProps> tells TS that Square is a React Functional Component that will return JSX (every functional react component returns JSX)
// SquareProps defines the structure of props
const Square: React.FC<SquareProps> = (props) => {  
  return (
    <button className="square"
      onClick={props.onClick}>
      {props.value}
    </button>
  );
}


const Board: React.FC<{
  squares: ('X' | 'O')[];
  handleClick: (i: number) => void;
}> = (props) => {

  const renderSquare = (i: number) => {
    return (
      <Square 
        value={props.squares[i]}
        onClick={()=> props.handleClick(i)}
      />
    );
  }
  
  return (
    <div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  )
}

const Game: React.FC<{}> = (props) => {
  const [squaresArray, setSquaresArray] = useState<('X' | 'O')[]>(Array(9).fill(null));
  const [stepNumber, setStepNumber] = useState<number>(0);
  const [xIsNext, setXIsNext] = useState<boolean>(true);

  const handleClick = (i: number) => {
    if (calculateWinner(squaresArray) || squaresArray[i]) {
      return;
    }

    squaresArray[i] = xIsNext ? 'X' : 'O';
    setStepNumber(stepNumber+1);
    setXIsNext(!xIsNext);
  }

  const jumpTo = (step: number) => {
    setStepNumber(step);
    setXIsNext((step % 2) === 0);
  }

  const winner = calculateWinner(squaresArray);

  let status;
  let gameInfo;
  if (winner) {
    status = 'Winner: ' +winner;
    gameInfo = 'game-info--state-winner';
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
    gameInfo = 'game-info';
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={squaresArray}
          handleClick={(i: number) => handleClick(i)}
        />
      </div>
      <div className={gameInfo}>
        <div>{status}</div>
        <ol>{stepNumber}</ol>
      </div>
    </div>
  );

}

function calculateWinner(boardStateSquaresArray:('X' | 'O')[]) {
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
    const [a, b, c] = lines[i];
    if (boardStateSquaresArray[a] && boardStateSquaresArray[a] === boardStateSquaresArray[b] && boardStateSquaresArray[a] === boardStateSquaresArray[c]) {
      return boardStateSquaresArray[a];
    }
  }
  return null;
}

export default Game;
