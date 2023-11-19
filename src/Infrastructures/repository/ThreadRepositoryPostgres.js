const ThreadRepository = require('../../Domains/threads/ThreadRepository');
const CreatedThread = require('../../Domains/threads/entities/CreatedThread');

class ThreadRepositoryPostgres extends ThreadRepository {
  constructor(pool, idGenerator) {
    super();
    this._pool = pool;
    this._idGenerator = idGenerator;
  }

  async save(payload) {
    const { owner, title, body } = payload;
    const id = `thread-${this._idGenerator()}`;
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const query = {
      text: 'INSERT INTO threads(id, owner, title, body, created_at, updated_at) VALUES($1, $2, $3, $4, $5, $6) RETURNING id, title, owner',
      values: [id, owner, title, body, createdAt, updatedAt]
    }

    const result = await this._pool.query(query);

    return new CreatedThread(result.rows[0]);
  }
}

module.exports = ThreadRepositoryPostgres;