function create2D(x, y, callback) {
  let new2DArray = Array.from({ length: y }, () => {
    return Array.from({ length: x }, callback);
  });

  return new2DArray;
}

export default create2D;
