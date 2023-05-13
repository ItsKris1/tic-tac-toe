import WaitingAnimation from "./WaitingAnimation/WaitingAnimation";

export function GameStatus({ gameState }) {
  let gameStatus;
  switch (gameState.status) {
    case "playing": {
      gameStatus = `${gameState.players[gameState.currentPlayer - 1]} turn`;
      break;
    }
    case "player_won": {
      gameStatus = `${gameState.players[gameState.currentPlayer - 1]} won!!!`;
      break;
    }
    case "draw": {
      gameStatus = `DRAW`;
      break;
    }

    case "waiting": {
      gameStatus = "Waiting for players";
      break;
    }
    default: {
      console.log("Invalid gameStatus: ", gameStatus);
    }
  }

  return (
    <div className="game-status">
      <p>{gameStatus}</p> {(gameState.status === "playing" || gameState.status === "waiting") && <WaitingAnimation />}
    </div>
  );
}
