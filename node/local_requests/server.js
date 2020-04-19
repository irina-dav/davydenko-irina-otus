const http = require('http');

const port = 5568;
const timeout = 100;   // for simulation slow responses

http.createServer((req, res) => {
    setTimeout(() => {
        res.statusCode = 200;
        res.end();
    }, timeout);
}).listen(port, "127.0.0.1", () => {
    console.log(`Listening localhost at port ${port}...`);
});