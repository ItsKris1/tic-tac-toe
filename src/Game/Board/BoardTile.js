import Cross from "../cross.svg";
import Circle from "../circle.svg";

export default function BoardTile({ row, col, playerNumber, onClick }) {
  return (
    <div className="tile" onClick={(e) => onClick(row, col)}>
      {playerNumber === 0 && " "}
      {playerNumber === 1 && <img src={Circle} alt="Circle"></img>}
      {playerNumber === 2 && <img src={Cross} alt="cross"></img>}
    </div>
  );
}
