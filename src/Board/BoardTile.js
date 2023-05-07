import Cross from "../cross.svg";
import Circle from "../circle.svg";

export default function BoardTile({ row, col, playerNumber, onClick }) {
  return (
    <div className="tile" onClick={(e) => onClick(row, col)}>
      {playerNumber === 0 && " "}
      {playerNumber === 1 && <Player1 />}
      {playerNumber === 2 && <Player2 />}
    </div>
  );
}

export function Player1() {
  return (
    <>
      <img src={Circle} alt="Circle"></img>
    </>
  );
}
export function Player2() {
  return (
    <>
      <img src={Cross} alt="cross"></img>
    </>
  );
}
