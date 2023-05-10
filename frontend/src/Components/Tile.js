import { Player1, Player2 } from "./Player/Player";
export default function Tile({ playerNumber, onClick, gameStatus }) {
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
