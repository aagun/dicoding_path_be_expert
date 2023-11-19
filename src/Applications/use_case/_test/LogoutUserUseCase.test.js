const LogoutUserUseCase = require('../LogoutUserUseCase');
const AuthenticationRepository = require('../../../Domains/authentications/AuthenticationRepository');

describe('LogoutUseCase', () => {
  it('should throw an error if use case payload not contain refresh token', async () => {
    const useCasePayload = {};

    const logoutUserUseCase = new LogoutUserUseCase({});

    await expect(logoutUserUseCase.execute(useCasePayload)).rejects
      .toThrowError('DELETE_AUTHENTICATION_USE_CASE.NOT_CONTAIN_REFRESH_TOKEN');

  });

  it('should throw an error if use case payload does not meet data type specification', async () => {
    const useCasePaylaod = {
      refreshToken: 123,
    };

    const logoutUserUseCase = new LogoutUserUseCase({});

    await expect(logoutUserUseCase.execute(useCasePaylaod)).rejects
      .toThrowError('DELETE_AUTHENTICATION_USE_CASE.PAYLOAD_DOES_NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should orchestrating the delete authentication action correctly', async () => {
    const useCasePayload = {
      refreshToken: 'refresh_token',
    };

    const mockAuthenticationRepository = new AuthenticationRepository();

    mockAuthenticationRepository.checkAvailabilityToken = jest.fn()
      .mockImplementation(() => Promise.resolve());
    mockAuthenticationRepository.deleteToken = jest.fn()
      .mockImplementation(() => Promise.resolve());

    const logoutUserUseCase = new LogoutUserUseCase({
      authenticationRepository: mockAuthenticationRepository
    });

    await logoutUserUseCase.execute(useCasePayload);

    expect(mockAuthenticationRepository.checkAvailabilityToken)
      .toBeCalledWith(useCasePayload.refreshToken);
    expect(mockAuthenticationRepository.deleteToken)
      .toBeCalledWith(useCasePayload.refreshToken);

  });
});