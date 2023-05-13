import Cross from "../icons/cross.svg";
import Circle from "../icons/circle.svg";

export function Player({ i, name, isMe }) {
  let playerNumber = i + 1;
  let icon;
  if (playerNumber === 1) icon = Circle;
  if (playerNumber === 2) icon = Cross;
  let infoText = isMe ? "(me)" : "(opponent)";

  return (
    <li className="player-info">
      <div>
        {name}
        <i>{infoText}</i> :
      </div>
      <img src={icon} alt=""></img>
    </li>
  );
}
