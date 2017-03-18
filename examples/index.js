const Hapi = require('hapi');
const hapiGeneroutify = require('../src/index');

const routes = require('./routes');

const server = new Hapi.Server();
server.connection({ host: 'localhost', port: 3001 });


// register hapiGeneroutify
server.register(hapiGeneroutify, (error) => {
  
  server.route(routes);

  server.method('errorHandler', (reply, err) => {
    console.error('errorHandler was called');

    // do some work (save error to log, send email to admin and so on)
    return reply(err.message).code(400);
  });

  server.start((err) => {
    if (err) throw err;
    console.log(`Server Running At: ${server.info.uri}`);
  });

});

