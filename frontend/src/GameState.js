const initialTiles = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];

export const initialGameState = {
  currentPlayer: 1,
  myPlayerIndex: null,
  status: "waiting",
  players: [],
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
      return { ...gameState, tiles: initialTiles, currentPlayer: 1, status: "playing" };
    }

    case "joined_game": {
      console.log("myplayerIndex", action.player_index);
      console.log("action", action);
      return { ...gameState, myPlayerIndex: action["player_index"] };
    }

    case "player_joined": {
      if (action.players.length > 1) {
        return { ...gameState, players: action.players, status: "playing" };
      } else {
        return { ...gameState, players: action.players };
      }
    }

    case "player_left": {
      return {
        ...gameState,
        status: "waiting",
        tiles: initialTiles,
        currentPlayer: 1,
        players: action.players,
      };
    }

    default: {
      console.log("Invalid action: ", action);
    }
  }
}
