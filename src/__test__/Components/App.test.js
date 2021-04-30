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

  fireEvent.click(playerSquares[0]);
  fireEvent.click(playerSquares[1]);
  fireEvent.click(playerSquares[2]);
  fireEvent.click(playerSquares[3]);
  fireEvent.click(playerSquares[4]);

  let ships = boards[0].querySelectorAll('.ship');

  expect(ships.length).toBe(17);
});
