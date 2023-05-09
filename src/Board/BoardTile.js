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
      {playerNumber === 1 && <img src={Circle} alt="Circle"></img>}
      {playerNumber === 2 && <img src={Cross} alt="cross"></img>}
    </div>
  );
}

export function Player1() {
  return <img src={Circle} alt="Circle"></img>;
}

export function Player2() {
  return <img src={Cross} alt="cross"></img>;
}
