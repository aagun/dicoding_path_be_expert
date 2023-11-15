const AuthenticationError = require('../AuthenticationError');

describe('AuthenticationError', () => {
  it('should create an error correctly', () => {
    const authenticationError = new AuthenticationError('an error occurred');

    expect(authenticationError.statusCode).toEqual(401);
    expect(authenticationError.message).toEqual('an error occurred');
    expect(authenticationError.name).toEqual('AuthenticationError');
  });
});
