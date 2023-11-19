const RegisteredUser = require('../src/Domains/users/entities/RegisteredUser');
const pool = require('../src/Infrastructures/database/postgres/pool');

const UsersTableTestHelper = {
  async addUser({
    id = 'user-123',
    username = 'dicoding',
    password = 'secret',
    fullname = 'Dicoding',
  }) {
    const query = {
      text: 'INSERT INTO users (id, username, password, fullname) VALUES ($1, $2, $3, $4) RETURNING id, username, fullname',
      values: [id, username, password, fullname],
    };

    const result = await pool.query(query);

    return new RegisteredUser({ ...result.rows[0] });
  },

  async findUsersById(id) {
    const query = {
      text: 'SELECT * FROM users WHERE id = $1',
      values: [id],
    };

    const result = await pool.query(query);
    return result.rows;
  },

  async cleanTable() {
    await pool.query('DELETE FROM users WHERE 1=1');
  },
};

module.exports = UsersTableTestHelper;
