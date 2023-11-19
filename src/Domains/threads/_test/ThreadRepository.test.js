const ThreadRepository = require('../ThreadRepository');

describe('ThreadRepository', () => {
  it('should throw error when invoke unimplemented method', async () => {
    const threadRepository = new ThreadRepository();

    await expect(threadRepository.save({})).rejects.toThrowError('THREAD_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(threadRepository.findById('')).rejects.toThrowError('THREAD_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(threadRepository.existById({})).rejects.toThrowError('THREAD_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  });
});