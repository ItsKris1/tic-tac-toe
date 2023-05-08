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
  switch (gameState) {
    case "playing": {
      gameStatus = `Player ${currentPlayer} turn`;
      break;
    }
    case "player_won": {
      gameStatus = `Player ${currentPlayer} won!!!`;
      break;
    }
    case "draw": {
      gameStatus = `DRAW`;
      break;
    }
    default: {
      console.log("Invalid gameStatus: ", gameStatus);
    }
  }

  function restartGame() {
    setTiles(initialTiles);
    setGameState("playing");
    setCurrentPlayer(1);
  }

  function handlePlayerMoved(newTiles) {
    setTiles(newTiles);
    setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
  }

  return (
    <div className="game">
      <p className="game-status">GAME STATUS</p>
      {gameStatus}

      <Board
        tiles={tiles}
        currentPlayer={currentPlayer}
        onPlayerMoved={handlePlayerMoved}
        gameState={gameState}
        onGameStateChange={(newGameState) => setGameState(newGameState)}
      />

      <button className="restart-btn" onClick={restartGame}>
        RESTART GAME
      </button>
    </div>
  );
}
