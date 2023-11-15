const RegisteredUser = require('../RegisteredUser');

describe('a RegisteredUser entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    const payload = {
      username: 'abc',
      password: 'abc',
    };

    expect(() => new RegisteredUser(payload)).toThrowError(
      'REGISTERED_USER.NOT_CONTAIN_NEEDED_PROPERTY'
    );
  });

  it('should throw error when payload did not meet data type specification', () => {
    const payload = {
      id: 'abc',
      username: 123,
      fullname: true,
    };

    expect(() => new RegisteredUser(payload)).toThrowError(
      'REGISTERED_USER.NOT_MEET_DATA_TYPE_SPECIFICATION'
    );
  });

  it('should create registeredUser object correctly', () => {
    const payload = {
      id: 'abc',
      username: 'agun',
      fullname: 'agun',
    };

    const { id, username, password } = new RegisteredUser(payload);

    expect(id).toEqual(payload.id);
    expect(username).toEqual(payload.username);
    expect(password).toEqual(payload.password);
  });
});
