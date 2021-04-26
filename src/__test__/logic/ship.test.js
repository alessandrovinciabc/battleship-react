import ship from '../../logic/ship.js';

describe('with arguments', () => {
  test('when no size is specified, returns default', () => {
    expect(ship()).toMatchObject({ size: 2 });
  });

  test("doesn't accept negative values as size", () => {
    expect(() => {
      ship(-1);
    }).toThrow();
  });

  test('sets ship squares with an array as 2nd argument', () => {
    expect(ship(2, [true, true])).toMatchObject({ squares: [true, true] });
  });

  test('ignore optional array if its length differs from size', () => {
    expect(ship(2, [true])).toMatchObject({ squares: [false, false] });
  });

  test('if first argument is a valid ship, returns copy', () => {
    let newShip = ship(4, [false, true, true, false]);
    expect(ship(newShip)).toMatchObject({
      size: 4,
      squares: [false, true, true, false],
    });
  });

  test('throws if first argument is invalid ship', () => {
    let fakeShip = { size: -1, squares: [true, false, true] };

    expect(() => {
      ship(fakeShip);
    }).toThrow();
  });
});

describe('return value', () => {
  test('is an object', () => {
    expect(typeof ship()).toBe('object');
  });

  test('has array of squares', () => {
    expect(ship(2)).toMatchObject({ squares: [false, false] });
  });

  test('has a size', () => {
    expect(ship(2)).toMatchObject({ size: 2 });
  });
});

describe('functionality', () => {
  test('records hits', () => {
    let newShip = ship(2);
    newShip.hit(1);
    expect(newShip).toMatchObject({ squares: [true, false] });
  });
  test('tells you if it sunk', () => {
    let sunkenShip = ship(2);
    sunkenShip.hit(1);
    sunkenShip.hit(2);
    expect(sunkenShip.isSunk()).toBe(true);

    let normalShip = ship(2);
    expect(normalShip.isSunk()).toBe(false);
  });
});
