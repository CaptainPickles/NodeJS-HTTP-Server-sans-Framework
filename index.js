const http = require('http');


http.createServer(function (req, res) {

    res.write('HELLO WORLD Lucas');
    res.end();

}).listen(5000);