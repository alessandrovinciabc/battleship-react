import getRandomNumber from './util/random.js';

let computer = {
  pickMove(board) {
    let hittableSquares = [];

    for (let i = 0; i < board.squares.length; ++i) {
      for (let k = 0; k < board.squares.length; ++k) {
        if (!board.squares[i][k].hit) {
          hittableSquares.push({ y: i, x: k });
        }
      }
    }

    let range = hittableSquares.length;

    if (range === 0) throw new Error('No squares to hit!');

    let move = {
      ...hittableSquares[getRandomNumber(0, range - 1)],
    };

    return move;
  },
};

export default computer;
