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
  const [gameState, setGameState] = useState("playing");
  const [tiles, setTiles] = useState(initialTiles);

  let gameStatus;
  if (gameState === "playing") {
    gameStatus = `Player ${currentPlayer} turn`;
  } else if (gameState === "player_won") {
    gameStatus = `Player ${currentPlayer} won!!!`;
  } else if (gameState === "draw") {
    gameStatus = `DRAW`;
  } else {
    console.log("Invalid gameStatus: ", gameStatus);
  }

  function restartGame() {
    setTiles(initialTiles);
    setGameState("playing");
    setCurrentPlayer(1);
  }

  function handlePlayerMoved() {
    setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
  }

  return (
    <div className="game">
      <p className="game-status">GAME STATUS</p>
      {gameStatus}

      <Board
        tiles={tiles}
        updateTiles={(newTiles) => setTiles(newTiles)}
        currentPlayer={currentPlayer}
        gameState={gameState}
        onPlayerMoved={handlePlayerMoved}
        onGameStateChange={(newGameState) => setGameState(newGameState)}
      />

      <button className="restart-btn" onClick={restartGame}>
        RESTART GAME
      </button>
    </div>
  );
}
