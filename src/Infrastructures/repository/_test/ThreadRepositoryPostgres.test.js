const pool = require('../../database/postgres/pool');
const ThreadsTableHelper = require('../../../../tests/ThreadsTableHelper');
const UsersTableHelper = require('../../../../tests/UsersTableTestHelper');
const NewThread = require('../../../Domains/threads/entities/NewThread');
const ThreadRepositoryPostgres = require('../ThreadRepositoryPostgres');

describe('ThreadRepositoryPostgres', () => {
  beforeAll(async () => {
    await UsersTableHelper.addUser({
      id: 'user-12345678',
      username: 'dicoding',
      password: 'secret',
      fullname: 'Dicoding',
    });
  });

  afterEach(async () => {
    await ThreadsTableHelper.cleanTable();
  });

  afterAll(async () => {
    // await UsersTableHelper.cleanTable();
    await pool.end();
  });


  describe('save function', () => {
    it('should persist create thread', async () => {
      const newThread = new NewThread(
        'user-12345678',
        {
          title: 'some_title',
          body: 'some_body',
        });

      const fakeGeneratorId = () => '123';
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, fakeGeneratorId);

      await threadRepositoryPostgres.save(newThread);

      const thread = await ThreadsTableHelper.findById('thread-123');
      expect(thread).toHaveLength(1);
    });
  });
});