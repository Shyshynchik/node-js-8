import {IncomingMessage, ServerResponse} from "http";

const http = require('http');

const hostname = '172.28.0.2';
const port = 3000;


const server = http.createServer(function (req: IncomingMessage, res: ServerResponse) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello world');
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});