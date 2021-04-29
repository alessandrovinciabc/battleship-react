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
