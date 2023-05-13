import { Player1, Player2 } from "./Player/Player";
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
      {playerNumber === 1 && <Player1></Player1>}
      {playerNumber === 2 && <Player2></Player2>}
    </div>
  );
}
