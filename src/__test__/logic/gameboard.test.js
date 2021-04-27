import gameBoard from '../../logic/gameboard.js';
import ship from '../../logic/ship.js';

describe('with arguments', () => {
  test('none return a standard gameboard', () => {
    let standard = gameBoard(10);
    delete standard.placeShip;
    expect(gameBoard()).toMatchObject(standard);
  });
});

describe('return value', () => {
  test('is an object', () => {
    expect(typeof gameBoard()).toBe('object');
  });
  test('has squares', () => {
    let template = { shipIndex: null, hit: false };
    expect(gameBoard(2)).toMatchObject({
      squares: [
        [template, template],
        [template, template],
      ],
    });
  });
  test('has array for ships', () => {
    expect(gameBoard(1)).toMatchObject({
      ships: [],
    });
  });
});

describe('functionality', () => {
  describe('place ship', () => {
    test('lets you place ships on the board horizontally', () => {
      let newGameBoard = gameBoard(1);
      let newShip = ship(1);
      newGameBoard.placeShip(newShip, { x: 0, y: 0 }, 'horizontal');
      expect(newGameBoard).toMatchObject({
        ships: [newShip],
        squares: [[{ hit: false, shipIndex: 0 }]],
      });

      let emptyTemplate = { hit: false, shipIndex: null };
      let filledTemplate = { hit: false, shipIndex: 0 };
      let anotherGameBoard = gameBoard(2);
      let anotherShip = ship(2);
      anotherGameBoard.placeShip(anotherShip, { x: 0, y: 1 }, 'horizontal');
      expect(anotherGameBoard).toMatchObject({
        ships: [anotherShip],
        squares: [
          [emptyTemplate, emptyTemplate],
          [filledTemplate, filledTemplate],
        ],
      });
    });

    test('prevents you from placing ships in illegal coords', () => {
      let newGameBoard = gameBoard(1);
      let newShip = ship(1);
      expect(() => {
        newGameBoard.placeShip(newShip, { x: 2, y: 0 });
      }).toThrow();
    });

    test('prevents you from placing overlapping ships', () => {
      let newGameBoard = gameBoard(1);
      let newShip = ship(1);
      let anotherShip = ship(1);

      newGameBoard.placeShip(newShip, { x: 0, y: 0 });

      expect(() => {
        newGameBoard.placeShip(anotherShip, { x: 0, y: 0 });
      }).toThrow();
    });
  });
});
