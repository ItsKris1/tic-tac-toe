const initialTiles = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];

export const initialGameState = {
  currentPlayer: "",
  me: "",
  status: "playing",
  tiles: initialTiles,
};

export function gameStateReducer(gameState, action) {
  switch (action.type) {
    case "player_moved": {
      return { ...gameState, currentPlayer: gameState.currentPlayer === 1 ? 2 : 1 };
    }

    case "status_changed": {
      return { ...gameState, status: action.status };
    }

    case "tiles_changed": {
      console.log("Changing state");
      return { ...gameState, tiles: action.newTiles };
    }

    case "game_restarted": {
      return initialGameState;
    }

    case "set_me": {
      return { ...gameState, me: action.me };
    }

    default: {
      console.log("Invalid action: ", action);
    }
  }
}
