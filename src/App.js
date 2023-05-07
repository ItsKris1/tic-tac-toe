import { useState } from "react";
import Board from "./Board/Board";
import "./App.css";

import { Player1 } from "./Board/BoardTile";
import { Player2 } from "./Board/BoardTile";

function App() {
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [gameFinished, setGameFinished] = useState(false);

  return (
    <div className="app">
      <h1>Tic Tac Toe</h1>
      <ul>
        <li>
          Player1: <Player1 />
        </li>
        <li>
          Player2: <Player2 />
        </li>
      </ul>
      <p>{gameFinished ? "Player " + currentPlayer + " won!" : "Player " + currentPlayer + " turn"}</p>
      {gameFinished && "Game finished"}

      <Board
        currentPlayer={currentPlayer}
        gameFinished={gameFinished}
        onPlayerMoved={() => setCurrentPlayer(currentPlayer === 1 ? 2 : 1)}
        onGameFinished={() => setGameFinished(true)}
      />
    </div>
  );
}

export default App;
