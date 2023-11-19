const CreatedThread = require('../../../Domains/threads/entities/CreatedThread');
const NewThread = require('../../../Domains/threads/entities/NewThread');
const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const AddThreadUseCase = require('../AddThreadUseCase');

describe('AddThreadUseCase', () => {
  it('should orchestrating the add thread action correctly', async () => {
    const ownerId = 'user-123';

    const threadUseCase = {
      title: 'some_title',
      body: 'some_body',
    };

    const expectedCreatedThread = new CreatedThread({
      id: 'thread-123',
      title: 'some_title',
      owner: 'user-123',
    });

    const mockThreadRepository = new ThreadRepository();

    mockThreadRepository.save = jest.fn()
      .mockImplementation(() => Promise.resolve(new CreatedThread({
        id: 'thread-123',
        title: 'some_title',
        owner: 'user-123',
      })));

    const addThreadUseCase = new AddThreadUseCase({
      threadRepository: mockThreadRepository,
    });

    const actualCreatedThread = await addThreadUseCase.execute(ownerId, threadUseCase);

    expect(actualCreatedThread).toEqual(expectedCreatedThread);
    expect(mockThreadRepository.save).toBeCalledWith(new NewThread(
      ownerId,
      {
        title: threadUseCase.title,
        body: threadUseCase.body
      }
    ))
  });
});