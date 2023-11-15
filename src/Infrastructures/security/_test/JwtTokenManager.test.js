const Jwt = require('@hapi/jwt');
const JwtTokenManager = require('../JwtTokenManager');
const InvariantError = require('../../../Commons/exceptions/InvariantError')

describe('JwtTokenManager', () => {
  describe('createAccessToken function', () => {
    it('should create access token correctly', async () => {
      const payload = { username: 'dicoding' };

      const mockJwtToken = {
        generate: jest.fn().mockImplementation(() => 'mock_token'),
      };

      const jwtTokenManager = new JwtTokenManager(mockJwtToken);

      const accessToken = await jwtTokenManager.createAccessToken(payload);

      expect(mockJwtToken.generate).toBeCalledWith(payload, process.env.ACCESS_TOKEN_KEY);
      expect(accessToken).toEqual('mock_token');
    });
  });

  describe('createRefreshToken function', () => {
    it('should create refresh token correctly', async () => {
      const payload = { username: 'dicoding' };

      const mockJwtToken = {
        generate: jest.fn().mockImplementation(() => 'mock_token'),
      };

      const jwtTokenManager = new JwtTokenManager(mockJwtToken);

      const refreshToken = await jwtTokenManager.createRefreshToken(payload);

      expect(mockJwtToken.generate).toBeCalledWith(payload, process.env.REFRESH_TOKEN_KEY);
      expect(refreshToken).toEqual('mock_token');
    });
  });

  describe('verifyRefreshToken function', () => {
    it('should throw an InvariantError when verification is failed', async () => {
      const jwtTokenManager = new JwtTokenManager(Jwt.token);

      const accessToken = await jwtTokenManager.createAccessToken({ username: 'dicoding' });

      expect(jwtTokenManager.verifyRefreshToken(accessToken)).rejects.toThrowError(InvariantError);
    });

    it('should throw an InvariantError when verification is success', async () => {
      const jwtTokenManager = new JwtTokenManager(Jwt.token);

      const refreshToken = await jwtTokenManager.createRefreshToken({ username: 'dicoding' });
      expect(jwtTokenManager.verifyRefreshToken(refreshToken)).resolves.not.toThrow(InvariantError);
    });
  });

  describe('decodepayload function', () => {
    it('should decode payload correctly', async () => {
      const jwtTokenManager = new JwtTokenManager(Jwt.token);
      const accessToken = await jwtTokenManager.createAccessToken({username: 'dicoding'});

      const {username: expectedUsername} = await jwtTokenManager.decodePayload(accessToken);

      expect(expectedUsername).toEqual('dicoding');
    });
  });
});