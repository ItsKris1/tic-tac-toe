import Tile from "./Tile.js";

export default function Board({ gameState, dispatch }) {
  function handleClickOnTile(clickedTileRow, clickedTileCol) {
    if (gameState.status === "draw" || gameState.status === "player_won") {
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
        dispatch({ type: "status_changed", status: "player_won" });
      } else if (checkBoardFull(newTiles)) {
        dispatch({ type: "status_changed", status: "draw" });
      } else {
        dispatch({ type: "player_moved" });
      }

      dispatch({ type: "tiles_changed", newTiles });
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

  return (
    <div className="board">
      {gameState.tiles.map((row, y) => {
        return row.map((tile, x) => (
          <Tile
            key={`tile-${x}`}
            playerNumber={tile}
            onClick={() => handleClickOnTile(y, x)}
            gameStatus={gameState.status}
          />
        ));
      })}
    </div>
  );
}
