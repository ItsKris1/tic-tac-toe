import { useReducer, useState } from "react";
import { Player1, Player2 } from "./Components/Player/Player";
import { initialGameState, gameStateReducer } from "./GameState";
import Board from "./Components/Board.js";
import WaitingAnimation from "./Components/WaitingAnimation/WaitingAnimation";
import useWebSocket from "react-use-websocket";

const WS_URL = "ws://127.0.0.1:8080";

function App() {
  const [gameState, dispatch] = useReducer(gameStateReducer, initialGameState);
  // console.log("gameState", gameState);
  const [isRoomFull, setIsRoomFull] = useState(false);
  const { readyState } = useWebSocket(WS_URL, {
    filter: (data) => data === "hello",
    share: true,
    onOpen: () => {
      console.log("WebSocket connection established.");
    },

    onMessage: (e) => {
      const data = JSON.parse(e.data);
      // console.log("data", data);
      dispatch(data);
    },

    onClose: (e) => {
      console.log("CLIENT: CLOSED", e);
      if (e.reason === "full") {
        setIsRoomFull(true);
      }
    },
  });

  // if (readyState !== 1) {
  //   // console.log("returning");
  // }

  if (isRoomFull) {
    return <h1>Two players supported only</h1>;
  }

  // console.log("Rendering");
  // console.log("Ready state: ", readyState);

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

      {/* <WebSocket></WebSocket> */}
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
          <div className="game-status">
            <p>{gameStatus}</p> {gameState.status === "playing" && <WaitingAnimation />}
          </div>
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
