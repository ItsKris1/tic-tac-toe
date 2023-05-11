import { useReducer, useState } from "react";
import { Player1, Player2 } from "./Components/Player/Player";
import { initialGameState, gameStateReducer } from "./GameState";
import Board from "./Components/Board.js";
import WaitingAnimation from "./Components/WaitingAnimation/WaitingAnimation";
import useWebSocket from "react-use-websocket";

const WS_URL = "ws://127.0.0.1:8080";

function App() {
  const [gameState, dispatch] = useReducer(gameStateReducer, initialGameState);
  const [isRoomFull, setIsRoomFull] = useState(false);

  const { sendJsonMessage } = useWebSocket(WS_URL, {
    share: true,
    onOpen: () => {
      console.log("WebSocket connection established.");
    },

    onMessage: (e) => {
      const data = JSON.parse(e.data);
      dispatch(data);
    },

    onClose: (e) => {
      if (e.reason === "full") {
        setIsRoomFull(true);
      }
    },
  });

  if (isRoomFull) {
    return <h1>Two players supported only</h1>;
  }

  let gameStatus;
  switch (gameState.status) {
    case "playing": {
      gameStatus = `${gameState.players[gameState.currentPlayer - 1]} turn`;
      break;
    }
    case "player_won": {
      gameStatus = `${gameState.players[gameState.currentPlayer - 1]} won!!!`;
      break;
    }
    case "draw": {
      gameStatus = `DRAW`;
      break;
    }

    case "waiting": {
      gameStatus = "Waiting for players";
      break;
    }
    default: {
      console.log("Invalid gameStatus: ", gameStatus);
    }
  }

  const playerHasMoved = gameState.tiles.flat().some((tile) => tile !== 0);
  const displayRestartbutton = playerHasMoved && gameState.status !== "waiting";

  return (
    <div className="flex-column-center app">
      <h1>Tic Tac Toe</h1>

      <ul>
        {gameState.players.map((player, i) => {
          if (i === 0) {
            return (
              <li className="player-info">
                {player}: <Player1></Player1>
              </li>
            );
          } else {
            return (
              <li className="player-info">
                {player}: <Player2></Player2>
              </li>
            );
          }
        })}
      </ul>

      <div className="flex-column-center game">
        <div className="flex-column-center">
          <h3>GAME STATUS</h3>
          <div className="game-status">
            <p>{gameStatus}</p>{" "}
            {(gameState.status === "playing" || gameState.status === "waiting") && <WaitingAnimation />}
          </div>
        </div>

        <Board gameState={gameState} dispatch={dispatch} />
      </div>

      {displayRestartbutton && (
        <button className="btn restart" onClick={() => sendJsonMessage({ type: "game_restarted" })}>
          RESTART GAME
        </button>
      )}
    </div>
  );
}

export default App;
