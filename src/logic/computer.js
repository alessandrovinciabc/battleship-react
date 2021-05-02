import getRandomNumber from './util/random.js';

let adjacentMode = false;

let computer = {
  pickMove(board) {
    let hittableSquares = [];

    if (adjacentMode) {
      for (let i = 0; i < board.squares.length; ++i) {
        for (let k = 0; k < board.squares.length; ++k) {
          if (
            board.squares[i][k].hit &&
            board.squares[i][k].shipIndex !== null
          ) {
            hittableSquares.push({ y: i + 1, x: k });
            hittableSquares.push({ y: i - 1, x: k });
            hittableSquares.push({ y: i, x: k + 1 });
            hittableSquares.push({ y: i, x: k - 1 });

            hittableSquares = hittableSquares.filter((move) => {
              if (!board.squares?.[move.y]?.[move.x]) return false;
              if (board.squares[move.y][move.x].hit) return false;

              return true;
            });
          }
        }
      }
    }

    if (hittableSquares.length === 0 || !adjacentMode) {
      adjacentMode = false;
      for (let i = 0; i < board.squares.length; ++i) {
        for (let k = 0; k < board.squares.length; ++k) {
          if (!board.squares[i][k].hit) {
            hittableSquares.push({ y: i, x: k });
          }
        }
      }
    }

    let range = hittableSquares.length;

    if (range === 0) throw new Error('No squares to hit!');

    let move = {
      ...hittableSquares[getRandomNumber(0, range - 1)],
    };

    if (board.squares[move.y][move.x].shipIndex !== null) {
      adjacentMode = true;
    }

    return move;
  },
};

export default computer;
