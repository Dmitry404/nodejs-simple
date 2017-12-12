const http = require('http');

http.createServer((request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/plain' });
  response.end('Hello Worm!');
}).listen(3000);

console.log('Test server is running on http://localhost:3000');
