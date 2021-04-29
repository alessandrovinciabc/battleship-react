import React from 'react';

import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import App from '../../App.js';

test('after the player makes a move, the computer makes one', () => {
  const { getAllByTestId } = render(<App />);
  const boards = getAllByTestId('board');
  const computerSquare = boards[1].querySelector('.square');
  fireEvent.click(computerSquare);

  let hitSquares = boards[0].querySelector('.square--hit');

  expect(hitSquares).toBeDefined();
});

test("clicking twice on the same square, doesn't trigger ai turn", () => {
  const { getAllByTestId } = render(<App />);
  const boards = getAllByTestId('board');
  const computerSquare = boards[1].querySelector('.square');

  fireEvent.click(computerSquare);
  fireEvent.click(computerSquare);

  let hitSquares = boards[0].querySelectorAll('.square--hit');

  expect(hitSquares.length).toBe(1);
});
