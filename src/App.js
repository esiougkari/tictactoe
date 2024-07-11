import React, { useState } from 'react';
import Board from './components/Board';
import WinnerPopup from './components/WinnerPopup';
import './App.css';

function Game() {
  const [history, setHistory] = useState([{ squares: Array(9).fill(null) }]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);
  const [playerX, setPlayerX] = useState('Player X');
  const [playerO, setPlayerO] = useState('Player O');
  const [showWinner, setShowWinner] = useState(false);
  const [winner, setWinner] = useState(null);
  const [gameStarted, setGameStarted] = useState(false); // Track if game has started

  const current = history[stepNumber];

  function handleClick(i) {
    const newHistory = history.slice(0, stepNumber + 1);
    const current = newHistory[newHistory.length - 1];
    const squares = current.squares.slice();

    if (calculateWinner(squares, playerX, playerO) || squares[i]) {
      return;
    }

    squares[i] = xIsNext ? 'X' : 'O';
    setHistory(newHistory.concat([{ squares: squares }]));
    setStepNumber(newHistory.length);
    setXIsNext(!xIsNext);

    const winner = calculateWinner(squares, playerX, playerO);
    if (winner) {
      setWinner(winner);
      setShowWinner(true);
    }
  }

  function jumpTo(step) {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
    setShowWinner(false); // Close winner popup when jumping to a move
  }

  const moves = history.map((step, move) => {
    const desc = move ? 'Go to move #' + move : 'Restart Game';
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });

  const handlePlayerXChange = (e) => {
    setPlayerX(e.target.value);
  };

  const handlePlayerOChange = (e) => {
    setPlayerO(e.target.value);
  };

  const startGame = () => {
    setGameStarted(true); // Set game started once players are ready
  };

  const handleCloseWinner = () => {
    setShowWinner(false);
    setWinner(null);
  };

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={current.squares} onClick={handleClick} />
      </div>
      <div className="game-info">
        <div className="game-status">
          {calculateWinner(current.squares, playerX, playerO)
            ? `${calculateWinner(current.squares, playerX, playerO)} wins!`
            : gameStarted // Check if game has started
            ? `Next player: ${xIsNext ? playerX : playerO}`
            : 'Enter Player Names and Start Game'}
        </div>
        {gameStarted ? (
          <React.Fragment>
            <div>
              <label>
                Player X:
                <input type="text" value={playerX} onChange={handlePlayerXChange} />
              </label>
            </div>
            <div>
              <label>
                Player O:
                <input type="text" value={playerO} onChange={handlePlayerOChange} />
              </label>
            </div>
          </React.Fragment>
        ) : (
          <button onClick={startGame}>Start Game</button>
        )}
        <ol>{moves}</ol>
      </div>
      {showWinner && <WinnerPopup winner={winner} onClose={handleCloseWinner} />}
    </div>
  );
}

function calculateWinner(squares, playerX, playerO) {
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
      return squares[a] === 'X' ? playerX : playerO;
    }
  }
  return null;
}

export default Game;