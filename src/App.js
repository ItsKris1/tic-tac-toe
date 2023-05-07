import { useState } from "react";
import Board from "./Board/Board";
import "./App.css";

import { Player1 } from "./Board/BoardTile";
import { Player2 } from "./Board/BoardTile";

// 0 - empty
// 1 - player1
// 2 - player2
const initialTiles = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];

function App() {
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [gameFinished, setGameFinished] = useState(false);
  const [tiles, setTiles] = useState(initialTiles);

  function restartGame() {
    setTiles(initialTiles);
    setGameFinished(false);
    setCurrentPlayer(1);
  }

  return (
    <div className="app">
      <h1>Tic Tac Toe</h1>
      <ul>
        <li>
          Player1: <Player1 />
        </li>
        <li>
          Player2: <Player2 />
        </li>
      </ul>
      <p>{gameFinished ? "Player " + currentPlayer + " won!" : "Player " + currentPlayer + " turn"}</p>
      {gameFinished && <RestartGameButton onClick={restartGame}></RestartGameButton>}

      <Board
        tiles={tiles}
        updateTiles={(tiles) => setTiles(tiles)}
        currentPlayer={currentPlayer}
        gameFinished={gameFinished}
        onPlayerMoved={() => setCurrentPlayer(currentPlayer === 1 ? 2 : 1)}
        onGameFinished={() => setGameFinished(!gameFinished)}
      />
    </div>
  );
}

function RestartGameButton({ onClick }) {
  return <button onClick={onClick}>Restart game</button>;
}
export default App;
