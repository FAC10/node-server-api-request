const _url = require('url');
const http = require('http');
const request = require('request');
const fs = require('fs');
const path = require('path');

const fetch = require('./fetch');


const handler = {};

handler.serveJson = (req, res) => {

  res.writeHead(200, {'content-type': 'application/json'});

  const randomWordUrl = 'http://randomword.setgetgo.com/get.php';

//   http.get(randomWordUrl, (apiRes) => {
//
//     let apiData = '';
//     apiRes.on('data', (chunk) => {
//       apiData += chunk;
//     });
//     apiRes.on('end', () => {
//
//       console.log(apiData);
//       res.end();
//     });
//
//   });





  request(randomWordUrl, (err, resAPI, body) => {
    const giphyUrl = ['http://api.giphy.com/v1/gifs/search?q=', body, '&api_key=dc6zaTOxFJmzC'].join('');

    request(giphyUrl, (err, resAPI, body) => {
      let json = JSON.parse(body);
      if (json.data.length) {
        json = json.data[0].images.original.url;
        res.end(JSON.stringify(json));
      } else {
        res.end(JSON.stringify('https://media.giphy.com/media/EFXGvbDPhLoWs/giphy.gif'));
      }
    });
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
