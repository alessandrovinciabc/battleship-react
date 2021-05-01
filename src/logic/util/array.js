function create2D(x, y, callback) {
  let new2DArray = Array.from({ length: y }, () => {
    return Array.from({ length: x }, callback);
  });

  new2DArray.cycleThrough = (callback) => {
    let boundaryX, boundaryY;

    boundaryY = new2DArray.length;
    boundaryX = new2DArray[0].length;

    for (let y = 0; y < boundaryY; ++y) {
      for (let x = 0; x < boundaryX; ++x) {
        new2DArray[y][x] = callback(new2DArray[y][x]);
      }
    }
  };

  return new2DArray;
}

export default create2D;
