let getRandomNumber = jest.fn();

getRandomNumber
  .mockReturnValue(6)
  .mockReturnValueOnce(4)
  .mockReturnValueOnce(3)
  .mockReturnValueOnce(2)
  .mockReturnValueOnce(1);

export default getRandomNumber;
