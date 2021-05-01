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
  const playerSquares = boards[0].querySelectorAll('.square');

  for (let i = 0; i < 5; ++i) {
    fireEvent.click(playerSquares[i]);
  }

  fireEvent.click(computerSquare);
  fireEvent.click(computerSquare);

  let hitSquares = boards[0].querySelectorAll('.square--hit');

  expect(hitSquares.length).toBe(1);
});

test('clicking on your own squares lets you place ships', () => {
  const { getAllByTestId } = render(<App />);
  const boards = getAllByTestId('board');
  const playerSquare = boards[0].querySelector('.square');

  fireEvent.click(playerSquare);

  let ships = boards[0].querySelectorAll('.ship');

  expect(ships.length > 0).toBe(true);
});

test("clicking twice on the same squares doesn't break anything", () => {
  const { getAllByTestId } = render(<App />);
  const boards = getAllByTestId('board');
  const playerSquare = boards[0].querySelector('.square');

  fireEvent.click(playerSquare);
  expect(() => {
    fireEvent.click(playerSquare);
  }).not.toThrow();
});

test('after placing one ship, the next one you place is smaller', () => {
  const { getAllByTestId } = render(<App />);
  const boards = getAllByTestId('board');
  const playerSquares = boards[0].querySelectorAll('.square');

  fireEvent.click(playerSquares[0]);
  fireEvent.click(playerSquares[1]);

  let ships = boards[0].querySelectorAll('.ship');

  expect(ships.length).toBe(9);
});

test('places the correct number of ships, with the correct total', () => {
  const { getAllByTestId } = render(<App />);
  const boards = getAllByTestId('board');
  const playerSquares = boards[0].querySelectorAll('.square');

  for (let i = 0; i < 5; ++i) {
    fireEvent.click(playerSquares[i]);
  }

  let ships = boards[0].querySelectorAll('.ship');

  expect(ships.length).toBe(17);
});

test('user can place ships horizontally', () => {
  const { getAllByTestId } = render(<App />);
  const boards = getAllByTestId('board');
  const playerSquares = boards[0].querySelectorAll('.square');

  fireEvent.keyDown(document.body, { key: 'r' });
  fireEvent.click(playerSquares[0]);

  expect(playerSquares[1]).toHaveClass('ship');
});

test("ships placed in different orientations don't overlap", () => {
  const { getAllByTestId } = render(<App />);
  const boards = getAllByTestId('board');
  const playerSquares = boards[0].querySelectorAll('.square');

  fireEvent.click(playerSquares[45]);
  fireEvent.keyDown(document.body, { key: 'r' });
  fireEvent.click(playerSquares[44]);

  expect(playerSquares[46]).not.toHaveClass('ship');
});

test('when player hits all ships, a winning message is shown', () => {
  const { getAllByTestId, queryByText } = render(<App />);
  const boards = getAllByTestId('board');
  const ships = boards[1].querySelectorAll('.ship');
  const playerSquares = boards[0].querySelectorAll('.square');

  for (let i = 0; i < 5; ++i) {
    fireEvent.click(playerSquares[i]);
  }

  for (let i = 0; i < ships.length; ++i) {
    fireEvent.click(ships[i]);
  }

  const winningText = queryByText(/Player has won!/i);

  expect(winningText).not.toBeNull();
});
