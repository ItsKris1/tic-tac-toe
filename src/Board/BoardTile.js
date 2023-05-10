import Cross from "./cross.svg";
import Circle from "./circle.svg";

export default function BoardTile({ playerNumber, onClick, gameStatus }) {
  let tileClass = "tile";
  if (gameStatus === "draw" || gameStatus === "player_won") {
    tileClass += " disabled";
  }
  return (
    <div className={tileClass} onClick={onClick}>
      {playerNumber === 0 && " "}
      {playerNumber === 1 && <Player1></Player1>}
      {playerNumber === 2 && <Player2></Player2>}
    </div>
  );
}

export function Player1() {
  return <img src={Circle} className="player" alt="Circle"></img>;
}

export function Player2() {
  return <img src={Cross} className="player" alt="cross"></img>;
}
