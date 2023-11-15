const AuthenticationTokenManager = require('../AuthenticationTokenManager');

describe('AuthenticationManager', () => {
  it('should throw an error when invoke unimplemented method', async () => {

    const authenticationTokenManager = new AuthenticationTokenManager();

    await expect(authenticationTokenManager.createAccessToken('')).rejects.toThrowError(
      'AUTHENTICATION_TOKEN_MANAGER.METHOD_NOT_IMPLEMENTED'
    )

    await expect(authenticationTokenManager.createRefreshToken('')).rejects.toThrowError(
      'AUTHENTICATION_TOKEN_MANAGER.METHOD_NOT_IMPLEMENTED'
    )

    await expect(authenticationTokenManager.verifyRefreshToken('')).rejects.toThrowError(
      'AUTHENTICATION_TOKEN_MANAGER.METHOD_NOT_IMPLEMENTED'
    )

    await expect(authenticationTokenManager.decodePayload('')).rejects.toThrowError(
      'AUTHENTICATION_TOKEN_MANAGER.METHOD_NOT_IMPLEMENTED'
    )
  });
});