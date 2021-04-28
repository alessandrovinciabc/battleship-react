import getRandomNumber from './util/random.js';

let computer = {
  pickMove(board) {
    let size = board.squares.length;

    let move = {
      x: getRandomNumber(0, size - 1),
      y: getRandomNumber(0, size - 1),
    };

    return move;
  },
};

export default computer;
