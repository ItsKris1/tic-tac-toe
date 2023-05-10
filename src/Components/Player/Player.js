import Cross from "./cross.svg";
import Circle from "./circle.svg";

export function Player1() {
  return <img src={Circle} className="player" alt="Circle"></img>;
}

export function Player2() {
  return <img src={Cross} className="player" alt="cross"></img>;
}
