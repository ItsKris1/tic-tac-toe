import { useReducer, useState } from "react";
import useWebSocket from "react-use-websocket";

import { initialGameState, gameStateReducer } from "./GameState";
import Board from "./Components/Board.js";
import { GameStatus } from "./Components/GameStatus";
import { Player } from "./Components/Player";

const WS_URL = "wss://kris-tic-tac-toe.onrender.com";

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

      // those data.types are handled by Board component
      if (data.type !== "tile_hovered" && data.type !== "unhover_tile") {
        dispatch(data);
      }
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

  const playerHasMoved = gameState.tiles.flat().some((tile) => tile !== 0);
  const displayRestartbutton = playerHasMoved && gameState.status !== "waiting";
  const playerList = gameState.players.map((player, i) => {
    return <Player name={player} i={i} isMe={i === gameState.myPlayerIndex}></Player>;
  });

  return (
    <div className="flex-column-center app">
      <h1>Tic Tac Toe</h1>

      <ul>{playerList}</ul>

      <div className="flex-column-center game">
        <div className="flex-column-center">
          <h3>GAME STATUS</h3>
          <GameStatus gameState={gameState}></GameStatus>
        </div>

        <Board gameState={gameState} wsURL={WS_URL} />
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
