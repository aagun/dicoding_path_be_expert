const AuthenticationRepository = require('../../../Domains/authentications/AuthenticationRepository');
const AuthenticationTokenManager = require('../../security/AuthenticationTokenManager');
const RefreshAuthenticationUseCase = require('../RefreshAuthenticationUseCase');
const { use } = require('bcrypt/promises');

describe('RefreshAuthenticationUseCase', () => {
  it('should throw an error when use case payload not contain refresh token', async () => {
    const useCasePayload = {};
    const refreshAuthenticationUseCase = new RefreshAuthenticationUseCase({});

    await expect(refreshAuthenticationUseCase.execute(useCasePayload))
      .rejects
      .toThrowError('REFRESH_AUTHENTICATION_USE_CASE.NOT_CONTAIN_REFRESH_TOKEN');
  });

  it('should throw an error when refresh token is not string', async () => {
    const useCasePayload = {
      refreshToken: 123,
    };

    const refreshAuthenticationToken = new RefreshAuthenticationUseCase({});

    await expect(refreshAuthenticationToken.execute(useCasePayload)).rejects
      .toThrowError('REFRESH_AUTHENTICATION_USE_CASE.PAYLOAD_DOES_NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should orchestrating the refresh authentication action correctly', async () => {
    const useCasePayload = {
      refreshToken: 'refresh_token',
    };

    const mockAuthenticationRepository = new AuthenticationRepository();
    const mockAuthenticationTokenManager = new AuthenticationTokenManager();

    mockAuthenticationRepository.checkAvailabilityToken = jest.fn()
      .mockImplementation(() => Promise.resolve());
    mockAuthenticationTokenManager.verifyRefreshToken = jest.fn()
      .mockImplementation(() => Promise.resolve());
    mockAuthenticationTokenManager.decodePayload = jest.fn()
      .mockImplementation(() => Promise.resolve({ username: 'agun', id: 'user-123' }));
    mockAuthenticationTokenManager.createAccessToken = jest.fn()
      .mockImplementation(() => Promise.resolve('new_access_token'));

    const refreshAuthenticationUseCase = new RefreshAuthenticationUseCase({
      authenticationTokenManager: mockAuthenticationTokenManager,
      authenticationRepository: mockAuthenticationRepository,
    });

    const accessToken = await refreshAuthenticationUseCase.execute(useCasePayload);

    expect(mockAuthenticationRepository.checkAvailabilityToken).toBeCalledWith(useCasePayload.refreshToken);
    expect(mockAuthenticationTokenManager.verifyRefreshToken).toBeCalledWith(useCasePayload.refreshToken);
    expect(mockAuthenticationTokenManager.decodePayload).toBeCalledWith(useCasePayload.refreshToken);
    expect(mockAuthenticationTokenManager.createAccessToken).toBeCalledWith({username: 'agun', id: 'user-123'});
    expect(accessToken).toEqual('new_access_token');

  });
});