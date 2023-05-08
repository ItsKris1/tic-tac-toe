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

  function handlePlayerMoved(newTiles) {
    setTiles(newTiles);
    setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
  }

  return (
    <div className="game">
      {!gameFinished && <b className="current-player">Player {currentPlayer} turn</b>}
      <Board
        tiles={tiles}
        currentPlayer={currentPlayer}
        gameFinished={gameFinished}
        onPlayerMoved={handlePlayerMoved}
        onGameFinished={() => setGameFinished(!gameFinished)}
      />

      <button onClick={restartGame}>RESTART GAME</button>
    </div>
  );
}
