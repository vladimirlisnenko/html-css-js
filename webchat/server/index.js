const routes = require('./routes')
const Hapi = require('@hapi/hapi');

const config = {
    port: 3000,
    host: 'localhost'
}

const init = async () => {
    const server = Hapi.server(config);

    routes.forEach(route => {
        server.route(route); 
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.error('============ FATAL ERROR ============')
    console.log(err);
    process.exit(1);
});

init();