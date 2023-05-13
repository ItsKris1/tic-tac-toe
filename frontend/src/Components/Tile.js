import Cross from "../icons/cross.svg";
import Circle from "../icons/circle.svg";

export default function Tile({ playerNumber, onClick, gameStatus, onTileHover, tileHovered }) {
  let tileClass = "tile";

  if (gameStatus !== "playing") {
    tileClass += " disabled";
  }

  if (tileHovered) {
    tileClass += " hover";
  }

  return (
    <div className={tileClass} onMouseEnter={onTileHover} onClick={onClick}>
      {playerNumber === 0 && " "}
      {playerNumber === 1 && <img src={Circle} alt=""></img>}
      {playerNumber === 2 && <img src={Cross} alt=""></img>}
    </div>
  );
}
