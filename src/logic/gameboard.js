function gameBoard(size = 10) {
  if (size <= 0) throw new Error('Invalid board size.');

  let yArray = [];
  for (let i = 0; i < size; ++i) {
    let xArray = [];
    for (let k = 0; k < size; ++k) {
      xArray.push({
        shipIndex: null,
        hit: false,
      });
    }
    yArray.push(xArray);
  }

  return {
    squares: yArray,
    ships: [],
    placeShip(ship, coords, orientation = 'horizontal') {
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

      if (boundToCheck + ship.size > size)
        throw new Error('Invalid position for ship.');

      if (orientation === 'horizontal') {
        for (let i = x; i < ship.size; ++i) {
          if (this.squares[y][i].shipIndex !== null)
            throw new Error(
              'Invalid position for ship: overlaps with another.'
            );
        }

        for (let i = x; i < x + ship.size; ++i) {
          this.squares[y][i].shipIndex = this.ships.length;
        }
      } else {
        for (let i = y; i < ship.size; ++i) {
          if (this.squares[i][x].shipIndex !== null)
            throw new Error(
              'Invalid position for ship: overlaps with another.'
            );
        }

        for (let i = y; i < y + ship.size; ++i) {
          this.squares[i][x].shipIndex = this.ships.length;
        }
      }

      this.ships.push(ship);
    },
  };
}

export default gameBoard;
