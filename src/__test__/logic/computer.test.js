import gameBoard from '../../logic/gameboard.js';
import ship from '../../logic/ship.js';

import computer from '../../logic/computer.js';
import getRandomNumber from '../../logic/util/random.js';

jest.mock('../../logic/util/random.js');

test('picks different moves', () => {
  let board = gameBoard(10);
  let moves = [computer.pickMove(board), computer.pickMove(board)];

  expect(moves[0]).not.toMatchObject(moves[1]);

  let moreMoves = [computer.pickMove(board), computer.pickMove(board)];
  expect(moreMoves[0]).not.toMatchObject(moreMoves[1]);
});
