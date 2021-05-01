import create2D from '../../../logic/util/array.js';

test('returns an array', () => {
  expect(create2D(0, 0) instanceof Array).toBeTruthy();
});

test('the returned array has the specified Y dimension', () => {
  expect(create2D(0, 5).length).toBe(5);
});

test('the returned array contains arrays with the right length', () => {
  let new2DArr = create2D(3, 5);

  new2DArr.forEach((arr) => {
    expect(arr.length).toBe(3);
  });
});

test('the elements of the arrays can be set through a callback', () => {
  let new2DArr = create2D(5, 5, () => ({ name: 'test' }));

  new2DArr.forEach((xArray) => {
    expect(xArray).toEqual(
      expect.arrayContaining(Array(5).fill({ name: 'test' }))
    );
  });
});
