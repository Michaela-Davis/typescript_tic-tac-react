import React from 'react';
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


function App() {
  return (
    <div><Square></Square></div>
  );
}

export default App;
