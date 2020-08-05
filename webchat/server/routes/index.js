/* eslint-disable no-unused-vars */
const routes = [];

routes.push({
  method: 'GET',
  path: '/test',
  handler: (request, h) => {

  },
});

routes.push({
  method: 'GET',
  path: '/',
  handler: (request, h) => 'Hello World!',
});

routes.push({
  method: 'GET',
  path: '/json',
  options: {
    cors: true,
  },
  handler: (request, h) => h.response({
    str: 'string',
    num: 1,
    bool: true,
    arr: ['1', '2', '3'],
  }),
});

routes.push({
  method: 'GET',
  path: '/param/{data}',
  handler: (request, h) => request.params.data,
});

routes.push({
  method: 'POST',
  path: '/post',
  handler: (request, h) => request.payload,
});

module.exports = routes;
