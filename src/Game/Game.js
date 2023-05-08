import { useState } from "react";
import Board from "./Board/Board";

// 0 - empty
// 1 - player1
// 2 - player2
const initialTiles = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];

export default function Game() {
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [gameFinished, setGameFinished] = useState(false);
  const [tiles, setTiles] = useState(initialTiles);

  function restartGame() {
    setTiles(initialTiles);
    setGameFinished(false);
    setCurrentPlayer(1);
  }

  function handlePlayerMoved() {
    setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
  }

  function handleGameFinished() {
    setGameFinished(true);
  }

  return (
    <div className="game">
      <p className="game-status">GAME STATUS</p>
      {gameFinished ? <p>Player {currentPlayer} won!!!</p> : <p>Player {currentPlayer} turn</p>}

      <Board
        tiles={tiles}
        updateTiles={(newTiles) => setTiles(newTiles)}
        currentPlayer={currentPlayer}
        gameFinished={gameFinished}
        onPlayerMoved={handlePlayerMoved}
        onGameFinished={handleGameFinished}
      />

      <button className="restart-btn" onClick={restartGame}>
        RESTART GAME
      </button>
    </div>
  );
}
