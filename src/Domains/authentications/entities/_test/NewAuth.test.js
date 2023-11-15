const NewAuth = require('../NewAuth');

describe('NewAuth entities', () => {
  it('Should throw an error when payload does not contain needed property', () => {
    const payload = {
      refreshToken: 'refreshToken'
    };

    expect(() => new NewAuth(payload)).toThrowError('NEW_AUTH.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('Should throw an error when payload does not meet data type specification', () => {
    const payload = {
      accessToken: 'accessToken',
      refreshToken: 1234,
    };

    expect(() => new NewAuth(payload)).toThrowError('NEW_AUTH.NOT_MEET_DATA_TYPE');
  });

  it('Should create NewAuth entities correctly', () => {
    const payload = {
      accessToken: 'access_token',
      refreshToken: 'refresh_token'
    }

    const newAuth = new NewAuth(payload);

    expect(newAuth).toBeInstanceOf(NewAuth);
    expect(newAuth.accessToken).toEqual(payload.accessToken);
    expect(newAuth.refreshToken).toEqual(payload.refreshToken);
  });
});