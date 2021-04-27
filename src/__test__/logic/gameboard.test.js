import gameBoard from '../../logic/gameboard.js';
import ship from '../../logic/ship.js';

describe('with arguments', () => {
  test('none return a standard gameboard', () => {
    let standard = gameBoard(10);
    let standardWithoutMethods = JSON.parse(JSON.stringify(standard));
    expect(gameBoard()).toMatchObject(standardWithoutMethods);
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

    test('lets you place ships on the board vertically', () => {
      let board = gameBoard(2);
      let newShip = ship(2);
      board.placeShip(newShip, { x: 1, y: 0 }, 'vertical');

      let emptyTemplate = { hit: false, shipIndex: null };
      let filledTemplate = { hit: false, shipIndex: 0 };
      expect(board).toMatchObject({
        ships: [newShip],
        squares: [
          [emptyTemplate, filledTemplate],
          [emptyTemplate, filledTemplate],
        ],
      });
    });

    test('prevents you from placing ships in illegal coords', () => {
      let newGameBoard = gameBoard(1);
      let newShip = ship(1);
      expect(() => {
        newGameBoard.placeShip(newShip, { x: 2, y: 0 });
      }).toThrow();

      let anotherBoard = gameBoard(2);
      let another = ship(1);
      let vertical = ship(2);
      anotherBoard.placeShip(another, { x: 0, y: 0 });
      expect(() => {
        anotherBoard.placeShip(vertical, { x: 0, y: 0 }, 'vertical');
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

  describe('receive hit', () => {
    test('tells you if you if ship was hit', () => {
      let newBoard = gameBoard(1);
      let newShip = ship(1);
      newBoard.placeShip(newShip, { x: 0, y: 0 });
      expect(newBoard.receiveHit({ x: 0, y: 0 })).toBe(true);
    });
    test('returns false if no ship was hit', () => {
      let board = gameBoard(1);
      expect(board.receiveHit({ x: 0, y: 0 })).toBe(false);
    });
    test('registers hit on the ship objects', () => {
      let board = gameBoard(1);
      let newShip = ship(1);
      board.placeShip(newShip, { x: 0, y: 0 });
      board.receiveHit({ x: 0, y: 0 });
      expect(board.ships[0].squares[0]).toBe(true);
    });
  });

  describe('has working ships', () => {
    test('returns false with no ships on board', () => {
      expect(gameBoard(1).hasWorkingShips()).toBe(false);
    });
    test('returns true with ships on board', () => {
      let newBoard = gameBoard(1);
      let newShip = ship(1);
      newBoard.placeShip(newShip, { x: 0, y: 0 });
      expect(newBoard.hasWorkingShips()).toBe(true);
    });
    test('returns false if ships are sunk', () => {
      let newBoard = gameBoard(2);
      let someShips = [ship(1), ship(1)];
      let points = [
        { x: 0, y: 0 },
        { x: 1, y: 1 },
      ];
      for (let i = 0; i < points.length; ++i) {
        newBoard.placeShip(someShips[i], points[i]);
        newBoard.receiveHit(points[i]);
      }

      expect(newBoard.hasWorkingShips()).toBe(false);
    });
  });
});
