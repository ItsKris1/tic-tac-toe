import Tile from "./Tile.js";
import useWebSocket from "react-use-websocket";
const WS_URL = "ws://127.0.0.1:8080";

export default function Board({ gameState }) {
  const { lastJsonMessage, sendJsonMessage } = useWebSocket(WS_URL, {
    share: true,
    filter: (e) => {
      const data = JSON.parse(e.data);
      return data.type === "tile_hovered" || data.type === "mouse_left_board";
    },
  });

  let tileHovered;

  if (lastJsonMessage !== null) {
    if (lastJsonMessage.type === "tile_hovered") {
      const tileCords = lastJsonMessage.cords;
      tileHovered = tileCords;
    }
  }

  const isCurrentPlayerTurn = gameState.currentPlayer !== gameState.myPlayerIndex + 1;

  function handleClickOnTile(clickedTileRow, clickedTileCol) {
    if (gameState.status !== "playing" || !isCurrentPlayerTurn) {
      return;
    }

    let playerMoved = false;

    const newTiles = gameState.tiles.map((row, y) => {
      return row.map((tile, x) => {
        if (tile === 0 && y === clickedTileRow && x === clickedTileCol) {
          playerMoved = true;
          return gameState.currentPlayer;
        } else {
          return tile;
        }
      });
    });

    if (playerMoved) {
      if (checkIfWon(newTiles, clickedTileCol, clickedTileRow)) {
        sendJsonMessage({ type: "status_changed", status: "player_won" });
      } else if (checkBoardFull(newTiles)) {
        sendJsonMessage({ type: "status_changed", status: "draw" });
      } else {
        sendJsonMessage({ type: "player_moved" });
      }

      sendJsonMessage({ type: "mouse_left_board" });
      sendJsonMessage({ type: "tiles_changed", newTiles });
    }
  }
  function checkIfWon(newTiles, x, y) {
    return (
      playerHasMatchingRow(newTiles, y) || playerHasMatchingColumn(newTiles, x) || playerHasMatchingDiagonal(newTiles)
    );
  }
  function checkBoardFull(newTiles) {
    for (let row = 0; row < newTiles.length; row++) {
      for (let col = 0; col < newTiles[row].length; col++) {
        if (newTiles[row][col] === 0) {
          return false;
        }
      }
    }

    return true;
  }

  function playerHasMatchingColumn(tiles, col) {
    for (let row = 0; row < 3; row++) {
      if (tiles[row][col] !== gameState.currentPlayer) {
        return false;
      }
    }
    return true;
  }
  function playerHasMatchingRow(tiles, row) {
    for (let col = 0; col < 3; col++) {
      if (tiles[row][col] !== gameState.currentPlayer) {
        return false;
      }
    }
    return true;
  }

  function playerHasMatchingDiagonal(tiles) {
    return checkDiagonalFromDownRight(tiles) || checkDiagonalFromUpLeft(tiles);
  }

  function checkDiagonalFromUpLeft(tiles) {
    for (let row = 0; row < 3; row++) {
      let col = row;
      if (tiles[row][col] !== gameState.currentPlayer) {
        return false;
      }
    }

    return true;
  }
  function checkDiagonalFromDownRight(tiles) {
    let col = 2;

    for (let row = 0; row < 3; row++) {
      if (tiles[row][col - row] !== gameState.currentPlayer) {
        return false;
      }
    }
    return true;
  }

  function isTileHovered(x, y) {
    if (tileHovered === undefined) {
      return false;
    } else {
      return tileHovered[0] === x && tileHovered[1] === y;
    }
  }

  return (
    <div
      className="board"
      onMouseLeave={() => {
        if (isCurrentPlayerTurn) {
          sendJsonMessage({ type: "mouse_left_board" });
        }
      }}
    >
      {gameState.tiles.map((row, y) => {
        return row.map((tile, x) => (
          <Tile
            key={`tile-${x}`}
            playerNumber={tile}
            onClick={() => handleClickOnTile(y, x)}
            gameStatus={gameState.status}
            gameState={gameState}
            onTileHover={() => {
              if (isCurrentPlayerTurn) {
                sendJsonMessage({ type: "tile_hovered", cords: [x, y] });
              }
            }}
            tileHovered={isTileHovered(x, y)}
          />
        ));
      })}
    </div>
  );
}
