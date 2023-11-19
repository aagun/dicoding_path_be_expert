class CreatedThread {
  constructor(payload) {
    this._verifyPayload(payload);
    this.id = payload.id;
    this.title = payload.title;
    this.owner = payload.owner;
  }

  _verifyPayload({ id, title, owner }) {
    if (!id || !title || !owner) {
      throw new Error('CREATED_THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (![id, title, owner].every(item => typeof item === 'string')) {
      throw new Error('CREATED_THREAD.DOES_NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = CreatedThread;