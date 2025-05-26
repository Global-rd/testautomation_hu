const http = require('node:http');

const hostname = '127.8.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    res.statusCode = 400;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Andris menő\n');
    });

    server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
    });