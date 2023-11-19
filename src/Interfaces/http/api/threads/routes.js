const routes = (handler) => ([
  {
    method: 'POST',
    path: '/threads',
    options: {
      auth: 'auth_jwt',
    },
  },
]);

module.exports = routes;