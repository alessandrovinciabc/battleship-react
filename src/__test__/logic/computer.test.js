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

test("doesn't pick illegal moves", () => {
  let board = gameBoard(2);
  board.receiveHit({ x: 0, y: 0 });
  board.receiveHit({ x: 0, y: 1 });
  board.receiveHit({ x: 1, y: 0 });

  getRandomNumber.mockReset();
  getRandomNumber.mockReturnValue(0);

  expect(computer.pickMove(board)).toMatchObject({ x: 1, y: 1 });
});

test('throws if all squares are already hit', () => {
  let board = gameBoard(1);
  board.receiveHit({ x: 0, y: 0 });

  expect(() => {
    computer.pickMove(board);
  }).toThrow();
});

test('hits adjacent squares after getting a hit', () => {
  let board = gameBoard(3);
  let newShip = ship(1);
  board.placeShip(newShip, { x: 1, y: 1 });

  getRandomNumber.mockReset();
  getRandomNumber.mockReturnValueOnce(4);
  getRandomNumber.mockReturnValueOnce(0);

  board.receiveHit(computer.pickMove(board));

  expect(computer.pickMove(board)).toMatchObject({ x: 1, y: 2 });
});
