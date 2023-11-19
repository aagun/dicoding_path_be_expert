class NewThread {
  constructor(ownerId, payload) {
    this._verifyPayload(payload);

    this.owner = ownerId;
    this.title = payload.title;
    this.body = payload.body;
  }

  _verifyPayload({ title, body }) {
    if (!title || !body) {
      throw new Error('NEW_THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof title !== 'string' || typeof body !== 'string') {
      throw new Error('NEW_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }

    if (title.length > 255) {
      throw new Error('NEW_THREAD.TITLE_MAX_LIMIT_REACHED')
    }
  }
}

module.exports = NewThread;