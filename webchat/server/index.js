const Hapi = require('@hapi/hapi');
const routes = require('./routes');

const config = {
  port: 3000,
  host: 'localhost',
};

const init = async () => {
  const server = Hapi.server(config);

  routes.forEach((route) => {
    server.route(route);
  });
  await server.start();
  console.warn('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
  console.error('============ FATAL ERROR ============');
  console.error(err);
  throw Error('Fatal');
});

init();
