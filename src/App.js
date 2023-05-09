import { useState } from "react";
import Board from "./Board/Board";

import { Player1, Player2 } from "./Board/BoardTile";

const initialTiles = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];

function App() {
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
    <div className="flex-column-center app">
      <h1>Tic Tac Toe</h1>
      <ul>
        <li className="player-info">
          Player 1: <Player1></Player1>
        </li>
        <li className="player-info">
          Player 2: <Player2></Player2>
        </li>
      </ul>
      <div className="flex-column-center game">
        <div className="flex-column-center">
          <h3>GAME STATUS</h3>
          <p>{gameStatus}</p>
        </div>

        <Board
          tiles={tiles}
          currentPlayer={currentPlayer}
          onPlayerMoved={handlePlayerMoved}
          gameState={gameState}
          onGameStateChange={(newGameState) => setGameState(newGameState)}
        />
      </div>
      <button className="btn restart" onClick={restartGame}>
        RESTART GAME
      </button>
    </div>
  );
}

export default App;
