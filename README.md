<h1 align="center">
  hapi-generoutify
  <br>
</h1>

<h4 align="center">Wraps route's handlers into generator</h4>

<p align="center">
  <a href="https://travis-ci.org/noveogroup-amorgunov/hapi-generoutify">
    <img src="https://travis-ci.org/noveogroup-amorgunov/hapi-generoutify.svg?branch=master"
         alt="Travis Build Status" />
  </a>
  <a href="https://www.npmjs.com/package/hapi-generoutify">
    <img src="https://img.shields.io/npm/dm/hapi-generoutify.svg"
         alt="Downloads per month" />
  </a>
  <a href="https://www.npmjs.com/package/hapi-generoutify">
    <img src="https://img.shields.io/npm/v/hapi-generoutify.svg"
         alt="Version" />
  </a>
  <a href="https://www.npmjs.com/package/hapi-generoutify">
    <img src="https://img.shields.io/npm/l/hapi-generoutify.svg"
         alt="License" />
  </a>
</p>

## Installation

```js
npm install hapi-generoutify --save
```

## Usage

You can use [hapi-generoutify](https://github.com/noveogroup-amorgunov/hapi-generoutify) for generator router's handlers (and the `yield` keyword), and [co](https://github.com/tj/co) today.

### Registering the Plugin

```javascript
const Hapi = require('hapi');
const hapiGeneroutify = require('hapi-generoutify');

const server = new Hapi.Server();
server.register([hapiGeneroutify], (error) => { ... });
```

Now all route's handler will be wrap to `co.wrap`.

```javascript
function* getUserAction(request, reply) {
  const user = yield database.User.findOne({ email: request.payload.email });

  if (!user) {
    yield Promise.reject(Boom.notFound('USER_NOT_FOUND'));
  }
    
  reply(user.toObject());
}

server.route({
  method: 'GET',
  path: '/',
  handler: getUserAction
});
```