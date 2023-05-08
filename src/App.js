import Game from "./Game/Game";
import "./App.css";
import { Player1, Player2 } from "./Game/Board/BoardTile";

function App() {
  return (
    <div className="app">
      <h1>Tic Tac Toe</h1>
      <ul>
        <li>
          Player1: <Player1></Player1>
        </li>
        <li>
          Player2: <Player2></Player2>
        </li>
      </ul>
      <Game />
    </div>
  );
}

export default App;
