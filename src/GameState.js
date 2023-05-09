const initialTiles = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];

export const initialGameState = {
  currentPlayer: 1,
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
      return { ...gameState, tiles: action.newTiles };
    }

    case "game_restarted": {
      return initialGameState;
    }

    default: {
      console.log("Invalid action: ", action);
    }
  }
}
