import React from 'react';

import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import gameBoard from '../../logic/gameboard.js';

import Board from '../../Components/Board.js';

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
