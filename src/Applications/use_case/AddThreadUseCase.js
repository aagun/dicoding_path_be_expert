const NewThread = require('../../Domains/threads/entities/NewThread');

class AddThreadUseCase {
  constructor({ threadRepository }) {
    this._threadRepository = threadRepository;
  }

  async execute(ownerId, payload) {
    const newThread = new NewThread(ownerId, payload);
    const createdThread =  await this._threadRepository.save(newThread);
    return createdThread;
  }
}

module.exports = AddThreadUseCase;