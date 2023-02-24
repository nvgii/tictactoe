import { Fragment, useState } from "react";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/esm/Button";
import "./game.css";

interface gamer {
  value: string;
  onSquareClick: any;
}

function Square({ value, onSquareClick }: gamer) {
  return (
    <>
      <Button
        className="square"
        onClick={onSquareClick}
        size="lg"
        variant="light"
      >
        {value}
      </Button>
    </>
  );
}
function Game() {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(""));
  const winner = whoIsWinner(squares);
  let status;

  function handleClick(i: number) {
    if (squares[i] || whoIsWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player " + (xIsNext ? "X" : "O");
  }

  return (
    <Fragment>
      <Container>
        <h1>
          <div className="status">{status}</div>
        </h1>

        <div className="board-row">
          <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
          <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
          <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
        </div>

        <div className="board-row">
          <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
          <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
          <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
        </div>
        <div className="board-row">
          <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
          <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
          <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
        </div>
      </Container>
    </Fragment>
  );
}

function whoIsWinner(squares: any[]) {
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
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default Game;
