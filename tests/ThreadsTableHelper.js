const pool = require('../src/Infrastructures/database/postgres/pool');
const CreatedThread = require('../src/Domains/threads/entities/CreatedThread');

const ThreadsTableHelper = {
  async save({
    id = 'thread-123',
    title = 'some_title',
    body = 'some_body',
    owner = 'user-123' }) {

    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const query = {
      text: 'INSERT INTO threads VALUES($1, $2, $3, $4, $5, $6) RETURNING id, title, owner',
      values: [id, title, body, owner, createdAt, updatedAt]
    }

    const result = await pool.query(query);

    if (!result.rowCount) {
      return {
        id,
        title,
        owner
      }
    }

    return new CreatedThread(result.rows[0]);
  },

  async findById(threadId) {
    const query = {
      text: 'SELECT * FROM threads WHERE id = $1',
      values: [threadId]
    }

    const result = await pool.query(query);
    console.info({ThreadsTableHelper_result: result.rows})
    return result.rows
  },

  async cleanTable() {
    await pool.query('DELETE FROM threads WHERE 1=1');
  }
}

module.exports = ThreadsTableHelper;