import "./App.css";
import Board from "./Board";
import { useState } from "react";

function App() {
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [gameFinished, setGameFinished] = useState(false);

  return (
    <div className="app">
      <h1>Tic Tac Toe</h1>
      <p>{gameFinished ? "Player " + currentPlayer + " won!" : "Player " + currentPlayer + " turn"}</p>
      <Board
        currentPlayer={currentPlayer}
        gameFinished={gameFinished}
        onPlayerMoved={() => setCurrentPlayer(currentPlayer === 1 ? 2 : 1)}
        onGameFinished={() => setGameFinished(true)}
      />
      {/* <p>Player1: o</p>
      <p>Player2: x</p> */}
    </div>
  );
}

export default App;
