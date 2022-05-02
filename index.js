const http = require('http');


http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' }); // http header
    const url = req.url;
    const method = req.method
    if (url === '/' && method === "GET") {
        res.write('<h1>HELLO WORLD Lucas</h1>');
        res.end();
    } else if (url === '/' && method !== "GET") {
        const statusCode = 403
        res.statusCode = statusCode
        res.write(`<h1>${statusCode} Méthode non authorisée</h1>`);
        res.end()
    }

}).listen(5000);