import Game from "./Game/Game";
import { Player1, Player2 } from "./Game/Board/BoardTile";

function App() {
  return (
    <div className="app">
      <h1>Tic Tac Toe</h1>
      <ul>
        <li className="player-info">
          Player1: <Player1></Player1>
        </li>
        <li className="player-info">
          Player2: <Player2></Player2>
        </li>
      </ul>
      <Game />
    </div>
  );
}

export default App;
