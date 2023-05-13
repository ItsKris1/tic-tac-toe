import Tile from "./Tile.js";
import useWebSocket from "react-use-websocket";
const WS_URL = "ws://127.0.0.1:8080";

export default function Board({ gameState }) {
  const { lastJsonMessage, sendJsonMessage } = useWebSocket(WS_URL, {
    share: true,

    // only update lastJsonMessage if message type includes information about whether a tile is hovered or not
    filter: (e) => {
      const data = JSON.parse(e.data);
      return data.type === "tile_hovered" || data.type === "unhover_tile";
    },
  });

  const isCurrentPlayerTurn = gameState.currentPlayer === gameState.myPlayerIndex + 1;

  // ---- EVENT HANDLERS -----
  function handleTileHover(x, y) {
    if (isCurrentPlayerTurn && gameState.status === "playing") {
      sendJsonMessage({ type: "tile_hovered", cords: [x, y] });
    }
  }

  function handleBoardMouseLeave() {
    if (isCurrentPlayerTurn) {
      sendJsonMessage({ type: "unhover_tile" });
    }
  }

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
        sendJsonMessage({ type: "current_player_changed" });
      }

      sendJsonMessage({ type: "unhover_tile" });
      sendJsonMessage({ type: "player_moved", newTiles });
    }
  }
  // ---- CHECK IF TILE HOVERED ----
  function isTileHovered(x, y) {
    if (lastJsonMessage !== null) {
      if (lastJsonMessage.type === "tile_hovered") {
        let tileHoveredCords = lastJsonMessage.cords;
        return tileHoveredCords[0] === x && tileHoveredCords[1] === y;
      }
    }

    return false;
  }
  // ---- CHECKING IF WON -----
  function checkIfWon(newTiles, x, y) {
    return (
      playerHasMatchingRow(newTiles, y) || playerHasMatchingColumn(newTiles, x) || playerHasMatchingDiagonal(newTiles)
    );
  }

  // ---- CHECKING IF BOARD IS FULL -----
  function checkBoardFull(newTiles) {
    return newTiles.flat().every((tile) => tile !== 0);
  }

  // --- CHECK BOARD COLUMNS, ROWS AND DIAGONALS
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

  return (
    <div className="board" onMouseLeave={handleBoardMouseLeave}>
      {gameState.tiles.map((row, y) => {
        return row.map((tile, x) => (
          <Tile
            key={`tile-${x}`}
            playerNumber={tile}
            gameStatus={gameState.status}
            tileHovered={isTileHovered(x, y)}
            onTileHover={() => handleTileHover(x, y)}
            onClick={() => handleClickOnTile(y, x)}
          />
        ));
      })}
    </div>
  );
}
