function ship(sizeOrObject = 2, squares) {
  if (sizeOrObject?.size && sizeOrObject?.squares) {
    let { size, squares } = sizeOrObject;

    if (size > 0 && squares?.length === size) {
      return ship(size, squares);
    } else {
      throw new Error('Invalid ship passed as first argument');
    }
  } else if (sizeOrObject < 0) throw new Error('Invalid size for a ship.');

  let newSquares =
    squares?.length === sizeOrObject
      ? squares
      : Array(sizeOrObject).fill(false);

  return {
    size: sizeOrObject,
    squares: newSquares,
    hit(where) {
      if (where < 0 || where > this.size) return;

      this.squares[where - 1] = true;
    },
    isSunk() {
      return this.squares.every((square) => square === true);
    },
  };
}

export default ship;
