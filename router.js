var handler = require('./handler.js');

module.exports = function(request, response){
  var url = request.url;

  var page = {
    '/' : 'index.html',
  }[url];

  if (page) {
    handler.serveStatic(request, response, page);

  } else if (url.indexOf('/random-image') === 0) {
    console.log(url);
    handler.serveJson(request, response);

  } else if (url.indexOf('/public') === 0) {
    handler.servePublic(request, response);

  } else {
    handler.serveError(request, response);

  }
};
