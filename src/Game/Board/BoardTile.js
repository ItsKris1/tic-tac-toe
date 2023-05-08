import Cross from "../cross.svg";
import Circle from "../circle.svg";

export default function BoardTile({ row, col, playerNumber, onClick, gameFinished }) {
  let tileClass = "tile";
  if (gameFinished) {
    tileClass += " disabled";
  }
  return (
    <div className={tileClass} onClick={(e) => onClick(row, col)}>
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
