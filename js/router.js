var handlers = require('./handlers.js');

var routes = {
  '/': handlers.home,
  '/public/main.css': handlers.file,
  '/public/frontend.js': handlers.file,
  '/login' : handlers.login,
  '404': handlers.notFound
};

module.exports = function(req, res) {
  console.log(req.url);
  if (routes[req.url]) {
    routes[req.url](req, res);
  } else if (req.url.match('/login')) {
    routes['/login'](req, res);
  } else {
    routes['404'](req, res);
  }
};
