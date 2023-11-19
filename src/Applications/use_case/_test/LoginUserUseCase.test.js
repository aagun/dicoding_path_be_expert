const NewAuth = require('../../../Domains/authentications/entities/NewAuth');
const UserRepository = require('../../../Domains/users/UserRepository');
const AuthenticationRepository = require('../../../Domains/authentications/AuthenticationRepository');
const AuthenticationTokenManager = require('../../security/AuthenticationTokenManager');
const PasswordHash = require('../../security/PasswordHash');
const LoginUserUseCase = require('../LoginUserUseCase');

describe('GetAuthenticationUseCase', () => {
  it('should orchestrating the get authentication action correctly', async () => {
    const useCasePayload = {
      username: 'dicoding',
      password: '12345678',
    };

    const mockedAuthentication = new NewAuth({
      accessToken: 'access_token',
      refreshToken: 'refresh_token',
    });

    const mockedUserRepository = new UserRepository();
    const mockedAuthenticationRepository = new AuthenticationRepository();
    const mockedAuthenticationTokenManager = new AuthenticationTokenManager();
    const mockedPasswordHash = new PasswordHash();

    mockedUserRepository.getPasswordByUsername = jest.fn()
      .mockImplementation(() => Promise.resolve('encrypted_password'));

    mockedPasswordHash.comparePassword = jest.fn()
      .mockImplementation(() => Promise.resolve());

    mockedAuthenticationTokenManager.createAccessToken = jest.fn()
      .mockImplementation(() => Promise.resolve(mockedAuthentication.accessToken));

    mockedAuthenticationTokenManager.createRefreshToken = jest.fn()
      .mockImplementation(() => Promise.resolve(mockedAuthentication.refreshToken));

    mockedUserRepository.getIdByUsername = jest.fn()
      .mockImplementation(() => Promise.resolve('user-123'));

    mockedAuthenticationRepository.addToken = jest.fn()
      .mockImplementation(() => Promise.resolve())

    // create LoginUserUseCase instance
    const loginUserUseCase = new LoginUserUseCase({
      userRepository: mockedUserRepository,
      authenticationRepository: mockedAuthenticationRepository,
      authenticationTokenManager: mockedAuthenticationTokenManager,
      passwordHash: mockedPasswordHash,
    });

    const actualAuthentication = await loginUserUseCase.execute(useCasePayload);

    expect(actualAuthentication).toEqual(new NewAuth({
      accessToken: mockedAuthentication.accessToken,
      refreshToken: mockedAuthentication.refreshToken
    }))

    expect(mockedUserRepository.getPasswordByUsername).toBeCalledWith(useCasePayload.username);
    expect(mockedPasswordHash.comparePassword).toBeCalledWith(useCasePayload.password, 'encrypted_password');
    expect(mockedUserRepository.getIdByUsername).toBeCalledWith(useCasePayload.username);
    expect(mockedAuthenticationTokenManager.createAccessToken).toBeCalledWith({ username: 'dicoding', id: 'user-123' });
    expect(mockedAuthenticationTokenManager.createRefreshToken).toBeCalledWith({ username: 'dicoding', id: 'user-123' });
    expect(mockedAuthenticationRepository.addToken).toBeCalledWith(mockedAuthentication.refreshToken);
  });
});