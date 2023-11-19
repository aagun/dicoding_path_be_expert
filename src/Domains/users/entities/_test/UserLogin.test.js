const UserLogin = require('../UserLogin');

describe('UserLogin entities', () => {
  it('Should throw error when payload does not contain needed property', () => {
    // Arrange
    const payload = {
      username: 'dicoding',
    };

    // Action & Assert
    expect(() => new UserLogin(payload)).toThrowError('USER_LOGIN.NOT_CONTAIN_NEEDED_PROPERTY');

  });

  it('Should throw error when payload does not meet data specification', () => {
    const payload = {
      username: 'dicoding',
      password: 12345678,
    };

    expect(() => new UserLogin(payload)).toThrowError('USER_LOGIN.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('Should create UserLogin correctly', () => {
    const payload = {
      username: 'dicoding',
      password: '12345678',
    };

    const userLogin = new UserLogin(payload);

    expect(userLogin).toBeInstanceOf(UserLogin);
    expect(userLogin.username).toEqual(payload.username);
    expect(userLogin.password).toEqual(payload.password);

  });
});