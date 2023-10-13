const ClientError = require('../ClientError');

describe('ClientError', () => {
  it('should throw an error when directly use it', () => {
    expect(() => new ClientError('')).toThrowError('Cannot instantiate abstract class');
  });
});
