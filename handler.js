const _url = require('url');
const http = require('http');
const request = require('request');
const fs = require('fs');
const path = require('path');

const fetch = require('./fetch');
const url = 'http://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC';
const url2 = 'http://randomword.setgetgo.com/get.php';

const handler = {};

handler.serveJson = (req, res) => {

  res.writeHead(200, {'content-type': 'application/json'});


  // http.get(url, (apiRes) => {
  //
  //   let apiData = '';
  //   apiRes.on('data', (chunk) => {
  //     apiData += chunk;
  //   });
  //   apiRes.on('end', () => {
  //     apiData = JSON.parse(apiData);
  //
  //     res.end(JSON.stringify(apiData.data[0].images.original.url));
  //   });
  //
  // });
  //

  request(url, (err, resAPI, body) => {
    let json = JSON.parse(body);
    json = json.data[0].images.original.url;
    res.end(JSON.stringify(json));
  });


};







// ----------------------------------------------
// STANDARD HANDLING BELOW (PUBLIC, STATIC, ETC.)
// ----------------------------------------------

handler.serveStatic = function (request, response, page) {
  fs.readFile(path.join(__dirname,'public', page), function(err, file){
    if (err) throw err;
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.end(file);
  });
};

handler.servePublic = function (request, response) {
  var url = request.url;
  var extension = url.split('.');
  extension = extension[extension.length - 1];
  var extensionType = {
    'html': 'text',
    'css': 'text/css',
    'js': 'application/javascript',
  };
  console.log(url, extensionType);

  fs.readFile(path.join(__dirname, url), function(error,file){
    if (error) {
      handler.serveError (request, response);
      return;
    }
    response.writeHead(200, {'Content-Type': extensionType[extension]});
    response.end(file);
  });
};


handler.serveError = function (request, response) {
  response.writeHead(404, {'Content-Type': 'text/html'});
  response.end('404: Page not found');
};

module.exports = handler;
