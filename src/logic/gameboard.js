function gameBoard(size = 10) {
  if (size <= 0) throw new Error('Invalid board size.');

  let squares = Array(size).fill(Array(size).fill(false));

  return {
    squares,
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

      this.ships.push({ coords: { x, y }, obj: ship, orientation });
    },
  };
}

export default gameBoard;
