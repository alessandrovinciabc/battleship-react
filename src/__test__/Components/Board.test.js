import React from 'react';

import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import gameBoard from '../../logic/gameboard.js';
import ship from '../../logic/ship.js';

import Board from '../../Components/Board.js';

import produce from 'immer';

test('title renders succesfully', () => {
  const name = 'Computer';
  const { getByTestId } = render(<Board playerName={name} />);

  const title = getByTestId('title');

  expect(title).toHaveTextContent(name);
});

test("if no title is passed it doesn't break", () => {
  const { getByTestId } = render(<Board />);
  const title = getByTestId('title');

  expect(title).toHaveTextContent('');
});

test('displays the correct amount of squares', () => {
  const board = gameBoard(2);
  const { getAllByTestId } = render(
    <Board playerName="Computer" board={board} />
  );

  const squares = getAllByTestId('square');

  expect(squares.length).toBe(4);
});

test('board duplicates state correctly', () => {
  const board = gameBoard(1);
  let nextState = produce(board, (draft) => {
    draft.receiveHit({ x: 0, y: 0 });
  });

  expect(() => {
    nextState.hasWorkingShips();
  }).not.toThrow();
});

test('displays squares that are hit differently', () => {
  const board = gameBoard(1);
  board.receiveHit({ x: 0, y: 0 });

  const { getByTestId } = render(<Board board={board} />);
  let square = getByTestId('square');

  expect(square).toHaveClass('square--hit');
});

test('displays ships', () => {
  const board = gameBoard(1);
  let newShip = ship(1);
  board.placeShip(newShip, { x: 0, y: 0 });

  const { getByTestId } = render(<Board board={board} />);
  let square = getByTestId('square');

  expect(square).toHaveClass('ship');
});
