import create2D from './util/array';

function createBoardSquares(size) {
  let callback = () => {
    return {
      shipIndex: null,
      shipComponent: null,
      hit: false,
    };
  };

  return create2D(size, size, callback);
}

function gameBoard(size = 10) {
  if (size <= 0) throw new Error('Invalid board size.');

  let squares = createBoardSquares(size);

  return {
    squares,
    ships: [],
    isValidPlaceForShip(ship, coords, orientation) {
      let { x, y } = coords;

      if (orientation !== 'horizontal' && orientation !== 'vertical')
        throw new Error('Invalid orientation provided.');

      if (x < 0 || y < 0 || x >= size || y >= size)
        throw new Error('Invalid coordinates for starting ship position.');

      let boundToCheck;
      if (orientation === 'horizontal') {
        boundToCheck = x;
      } else {
        boundToCheck = y;
      }

      if (boundToCheck + ship.size > size) return false;

      if (orientation === 'horizontal') {
        for (let i = x; i < x + ship.size; ++i) {
          if (this.squares[y][i].shipIndex !== null) return false;
        }
      } else {
        for (let i = y; i < y + ship.size; ++i) {
          if (this.squares[i][x].shipIndex !== null) return false;
        }
      }

      return true;
    },
    placeShip(ship, coords, orientation = 'horizontal') {
      let isValid = this.isValidPlaceForShip(ship, coords, orientation);

      if (!isValid) throw new Error('Invalid placement for ship.');

      let { x, y } = coords;

      if (orientation === 'horizontal') {
        let count = 1;
        for (let i = x; i < x + ship.size; ++i) {
          this.squares[y][i].shipIndex = this.ships.length;
          this.squares[y][i].shipComponent = count++;
        }
      } else {
        let count = 1;
        for (let i = y; i < y + ship.size; ++i) {
          this.squares[i][x].shipIndex = this.ships.length;
          this.squares[i][x].shipComponent = count++;
        }
      }

      this.ships.push(ship);
    },
    receiveHit(coords) {
      let { x, y } = coords;
      let square = this.squares[y][x];
      let result = false;

      if (square.shipIndex !== null) {
        this.ships[square.shipIndex].hit(square.shipComponent);

        result = true;
      }
      square.hit = true;

      return result;
    },
    hasWorkingShips() {
      if (!this.ships.length) return false;

      let result = this.ships.every((ship) => !ship.isSunk());
      return result;
    },
    autoPlaceShips(arrOfShips) {
      let totalSize = arrOfShips.reduce(
        (accumulator, ship) => accumulator + ship.size,
        0
      );

      if (totalSize > size)
        throw new Error("Can't autoplace: ships exceed board size.");
    },
  };
}

export default gameBoard;
