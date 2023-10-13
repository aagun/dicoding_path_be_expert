class RegisteredUser {
  constructor(payload) {
    this._verifyPayload(payload);

    const { username, id, fullname } = payload;

    this.id = id;
    this.username = username;
    this.fullname = fullname;
  }

  _verifyPayload({ id, username, fullname }) {
    if (!username || !id || !fullname) {
      throw new Error('REGISTERED_USER.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof username !== 'string' || typeof id !== 'string' || typeof fullname !== 'string') {
      throw new Error('REGISTERED_USER.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = RegisteredUser;
