import { useReducer } from "react";
import Board from "./Board/Board";

import { Player1, Player2 } from "./Board/BoardTile";
import { initialGameState, gameStateReducer } from "./GameState";
import Dots from "./Dots";

function App() {
  const [gameState, dispatch] = useReducer(gameStateReducer, initialGameState);

  let gameStatus;
  switch (gameState.status) {
    case "playing": {
      gameStatus = `Player ${gameState.currentPlayer} turn`;
      break;
    }
    case "player_won": {
      gameStatus = `Player ${gameState.currentPlayer} won!!!`;
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
          <p>
            {gameStatus} <Dots></Dots>
          </p>
        </div>

        <Board gameState={gameState} dispatch={dispatch} />
      </div>
      <button className="btn restart" onClick={() => dispatch({ type: "game_restarted" })}>
        RESTART GAME
      </button>
    </div>
  );
}

export default App;
