import "./Board.css";
import BoardTile from "./BoardTile";

export default function Board({ tiles, currentPlayer, onPlayerMoved, gameFinished, onGameFinished, updateTiles }) {
  function handleClickOnTile(clickedTileRow, clickedTileCol) {
    if (gameFinished) {
      return;
    }

    let validMove = false;

    const newTiles = tiles.map((row, y) => {
      return row.map((tile, x) => {
        if (tile === 0 && y === clickedTileRow && x === clickedTileCol) {
          validMove = true;
          return currentPlayer;
        } else {
          return tile;
        }
      });
    });

    if (validMove) {
      if (checkBoardFull(newTiles)) {
        // game is draw
        onGameFinished();
      } else if (checkIfWon(newTiles, clickedTileCol, clickedTileRow)) {
        onGameFinished();
      } else {
        onPlayerMoved();
      }

      updateTiles(newTiles);
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
      console.log("Checking: {}", row, col);

      if (tiles[row][col] !== currentPlayer) {
        return false;
      }
    }
    return true;
  }
  function playerHasMatchingRow(tiles, row) {
    for (let col = 0; col < 3; col++) {
      if (tiles[row][col] !== currentPlayer) {
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
      if (tiles[row][col] !== currentPlayer) {
        return false;
      }
    }

    return true;
  }
  function checkDiagonalFromDownRight(tiles) {
    let col = 2;

    for (let row = 0; row < 3; row++) {
      if (tiles[row][col - row] !== currentPlayer) {
        return false;
      }
    }
    return true;
  }

  return (
    <div className="board">
      {tiles.map((row, y) => {
        return row.map((tile, x) => (
          <BoardTile row={y} col={x} playerNumber={tile} onClick={handleClickOnTile} gameFinished={gameFinished} />
        ));
      })}
    </div>
  );
}
