const co = require('co');

// This plugin is used to make hapi support handler as generator
exports.register = function (server, options, next) {
  // ref to original route method 
  const _route = server.__proto__.route;

  // default error handler
  const errorHandler = (reply, err) => reply(err);

  // wraps generator so it can be used in Hapi responses
  const wrapGen = function (generator) {
    const handler = co.wrap(generator);
    return function (request, reply) {
      handler.call(this, request, reply).catch(err => {
        if (typeof server.methods.errorHandler === 'function') {
          server.methods.errorHandler(reply, err);
        } else {
          errorHandler(reply, err);
        }
      });
    };
  };

  // replace server's route method
  server.__proto__.route = function (routes, ...args) {
    const routesList = Array.isArray(routes) ? routes : [routes];
    const generoutes = routesList.map((route) => {
      const _handler = route.handler || (route.config && route.config.handler);

      if (_handler) {
        route.handler = wrapGen(_handler);
      }

      if (route.config && route.config.handler) {
        delete route.config.handler;
      }

      return route;
    });
    return _route.call(this, generoutes, ...args);
  };

  next();
};

exports.register.attributes = {
  pkg: require('../package.json')
};
