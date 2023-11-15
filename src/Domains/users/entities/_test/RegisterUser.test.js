const RegisterUser = require('../RegisterUser');

describe('a RegisterUser entities', () => {
  it('should throw error when payload did not contain needed property', async () => {
    const payload = {
      username: 'abc',
      password: 'abc',
    };

    expect(() => new RegisterUser(payload)).toThrowError(
      'REGISTER_USER.NOT_CONTAIN_NEEDED_PROPERTY'
    );
  });

  it('should throw error when payload did not meet data type specification', () => {
    const payload = {
      username: 123,
      password: 'abc',
      fullname: true,
    };

    expect(() => new RegisterUser(payload)).toThrowError(
      'REGISTER_USER.NOT_MEET_DATA_TYPE_SPECIFICATION'
    );
  });

  it('should throw error when username contains more than 50 character', () => {
    const payload = {
      username:
        'abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefg',
      password: '1234567890',
      fullname: 'agun',
    };

    expect(() => new RegisterUser(payload)).toThrowError('REGISTER_USER.USERNAME_LIMIT_CHAR');
  });

  it('should throw error when username contains restricted character', () => {
    const payload = {
      username: 'abc 123',
      password: '12345678',
      fullname: 'agun',
    };

    expect(() => new RegisterUser(payload)).toThrowError(
      'REGISTER_USER.USERNAME_CONTAIN_RESTRICTED_CHARACTER'
    );
  });

  it('should create registerUser object correctly', () => {
    const payload = {
      username: 'agun',
      password: '123',
      fullname: 'agun',
    };

    const { username, password, fullname } = new RegisterUser(payload);

    expect(username).toBe(payload.username);
    expect(password).toBe(payload.password);
    expect(fullname).toBe(payload.fullname);
  });
});
