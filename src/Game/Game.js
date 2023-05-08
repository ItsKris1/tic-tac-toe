import { useState } from "react";
import Board from "./Board/Board";
import RestartGameButton from "./RestartGameButton";

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
    <div>
      {gameFinished ? "Player " + currentPlayer + " won!" : "Player " + currentPlayer + " turn"}

      <RestartGameButton onClick={restartGame}></RestartGameButton>

      <Board
        tiles={tiles}
        currentPlayer={currentPlayer}
        gameFinished={gameFinished}
        onPlayerMoved={handlePlayerMoved}
        onGameFinished={() => setGameFinished(!gameFinished)}
      />
    </div>
  );
}
