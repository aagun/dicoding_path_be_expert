const NotFoundError = require('../NotFoundError');

describe('NotFoundError', () => {
  it('should create an error correctly', () => {
    const notFoundError = new NotFoundError('an error occurred');

    expect(notFoundError.statusCode).toEqual(404);
    expect(notFoundError.message).toEqual('an error occurred');
    expect(notFoundError.name).toEqual('NotFoundError');
  });
});
