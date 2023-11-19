const NewThread = require('../NewThread');

describe('NewThread entities', () => {
  it('should throw error when payload does not contain needed property', () => {
    const ownerId = 'user-123';
    const payload = {
      title: 'some_title',
    };
    expect(() => new NewThread(ownerId, payload))
      .toThrowError('NEW_THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload does not meet data type specification', () => {
    const ownerId = 'user-123';
    const payload = {
      title: 'some_title',
      body: 123,
    };
    expect(() => new NewThread(ownerId, payload))
      .toThrowError('NEW_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should throw error when title contain more than 255 characters', () => {
    const payload = {
      title: 'some_title'.repeat(255),
      body: 'some_body',
    };

    expect(() => new NewThread('', payload))
      .toThrowError('NEW_THREAD.TITLE_MAX_LIMIT_REACHED');
  });

  it('should create newThread object correctly', () => {
    const ownerId = 'user-123';
    const payload = {
      title: 'some_title',
      body: 'some_body',
    };

    const { owner, title, body } = new NewThread(ownerId, payload);

    expect(title).toEqual(payload.title);
    expect(owner).toEqual(ownerId);
    expect(body).toEqual(payload.body);

  });
});