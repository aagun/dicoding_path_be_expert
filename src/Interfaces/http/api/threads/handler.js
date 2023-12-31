const AddThreadUseCase = require('../../../../Applications/use_case/AddThreadUseCase');

class ThreadHandler {
  constructor(container) {
    this._container = container;

    this.postThreadHandler = this.postThreadHandler.bind(this);
  }

  async postThreadHandler(request, h) {
    const addThreadUseCase = this._container.getInstance(AddThreadUseCase.name);
    const ownerId = request.auth.credentials.id;
    const payload = {
      title: request.payload.title,
      body: request.payload.body,
    };

    const addedThread = await addThreadUseCase.execute(ownerId, payload);

    const response = h.response({
      status: 'success',
      data: [
        addedThread,
      ],
    });
    response.statusCode(201);
    return response;
  }
}

module.exports = ThreadHandler;