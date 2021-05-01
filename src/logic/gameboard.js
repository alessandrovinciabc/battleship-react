import create2D from './util/array';
import getRandomNumber from './util/random.js';

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

function checkForValidPlacements(board) {
  let size = board.squares.length;

  let computations = create2D(size, size, () => ({ counterX: 0, counterY: 0 }));

  let checkElementHorizontally = (el, coords) => {
    let { x, y } = coords;

    if (el.shipIndex === null) {
      for (let i = x; i >= 0 && board.squares[y][i].shipIndex === null; --i) {
        computations[y][i].counterX += 1;
      }
    }
  };

  let checkElementVertically = (el, coords) => {
    let { x, y } = coords;

    if (el.shipIndex === null) {
      for (let i = y; i >= 0 && board.squares[i][x].shipIndex === null; --i) {
        computations[i][x].counterY += 1;
      }
    }
  };

  for (let y = 0; y < size; ++y) {
    for (let x = 0; x < size; ++x) {
      checkElementHorizontally(board.squares[y][x], { x, y });
      checkElementVertically(board.squares[y][x], { x, y });
      computations[y][x].coords = { x, y };
    }
  }

  return computations;
}

let filterPlacements = (placements, shipSize, orientation = 'horizontal') => {
  let result = [];
  let toCheck = orientation === 'horizontal' ? 'counterX' : 'counterY';

  for (let y = 0; y < placements.length; ++y) {
    for (let x = 0; x < placements.length; ++x) {
      if (placements[y][x][toCheck] >= shipSize) {
        result.push(placements[y][x]);
      }
    }
  }

  return result;
};

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

      let result = this.ships.some((ship) => !ship.isSunk());
      return result;
    },
    autoPlaceShips(arrOfShips) {
      let totalSize = arrOfShips.reduce(
        (accumulator, ship) => accumulator + ship.size,
        0
      );

      if (totalSize > size * size)
        throw new Error("Can't autoplace: ships exceed board size.");

      for (let i = 0; i < arrOfShips.length; ++i) {
        let possiblePlacements = checkForValidPlacements(this);

        let options = {
          vertical: filterPlacements(
            possiblePlacements,
            arrOfShips[i].size,
            'vertical'
          ),
          horizontal: filterPlacements(
            possiblePlacements,
            arrOfShips[i].size,
            'horizontal'
          ),
        };

        if (options.vertical.length > 0 && options.horizontal.length > 0) {
          let randomOrientation = getRandomNumber(0, 1)
            ? 'vertical'
            : 'horizontal';

          let randomMove = getRandomNumber(
            0,
            options[randomOrientation].length - 1
          );

          this.placeShip(
            arrOfShips[i],
            options[randomOrientation][randomMove].coords,
            randomOrientation
          );
        } else if (options.vertical.length > 0) {
          let randomMove = getRandomNumber(0, options.vertical.length - 1);

          this.placeShip(
            arrOfShips[i],
            options.vertical[randomMove].coords,
            'vertical'
          );
        } else if (options.horizontal.length > 0) {
          let randomMove = getRandomNumber(0, options.horizontal.length - 1);

          this.placeShip(
            arrOfShips[i],
            options.horizontal[randomMove].coords,
            'horizontal'
          );
        }
      }
    },
  };
}

export default gameBoard;
