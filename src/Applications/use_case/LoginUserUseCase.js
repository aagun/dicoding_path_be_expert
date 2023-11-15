const UserLogin = require('../../Domains/users/entities/UserLogin');
const NewAuth = require('../../Domains/authentications/entities/NewAuth');

class LoginUserUseCase {
  constructor({
                userRepository,
                passwordHash,
                authenticationTokenManager,
                authenticationRepository,
              }) {
    this._userRepository = userRepository;
    this._passwordHash = passwordHash;
    this._authenticationTokenManager = authenticationTokenManager;
    this._authenticationRepository = authenticationRepository;
  }

  async execute(payload) {
    const { username, password } = new UserLogin(payload);

    const encryptedPassword = await this._userRepository.getPasswordByUsername(username);

    await this._passwordHash.comparePassword(password, encryptedPassword);

    const id = await this._userRepository.getIdByUsername(username);

    const accessToken = await this._authenticationTokenManager.createAccessToken({id, username});

    const refreshToken = await this._authenticationTokenManager.createRefreshToken({id, username});

    const newAuth = new NewAuth({
      accessToken,
      refreshToken
    });

    await this._authenticationRepository.addToken(newAuth.refreshToken);

    return newAuth;
  }
}

module.exports = LoginUserUseCase;