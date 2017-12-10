var http = require("http");

http.createServer(function (request, response) {
  response.writeHead(200, {'Content-Type': 'text/plain'});
  response.end("Hello Worm!");	  
}).listen(8080);

console.log("Test server is running on http://localhost:8080");


