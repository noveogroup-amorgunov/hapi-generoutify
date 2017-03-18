module.exports = [{
  method: 'GET',
  path:'/hello', 
  // simple handler
  handler: function (request, reply) {
    return reply('hello world');
  }
}, {
  method: 'GET',
  path:'/await/{seconds?}', 
  // wait {seconds} seconds before reply, and if seconds isn't
  // passed, throw new Error
  handler: function *(request, reply) {
    const seconds = +request.params.seconds;

    if (!seconds) {
      throw new Error('ERROR: "seconds" param is required');
    }

    yield (new Promise(resolve => setTimeout(resolve, seconds * 1000)));

    return reply(`await ${seconds} seconds`);
  }
}];