const CreatedThread = require('../CreatedThread');

describe('CreatedThread', () => {
  it('should throw error when payload does not contain needed property', () => {
    const payload = {
      id: 'thread-123',
      owner: 'user-123'
    };

    expect(() => new CreatedThread(payload))
      .toThrowError('CREATED_THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload does not meet data type specification', () => {
    const payload = {
      id: 'thread-123',
      owner: 'user-123',
      title: 123
    };

    expect(() => new CreatedThread(payload))
      .toThrowError('CREATED_THREAD.DOES_NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

});