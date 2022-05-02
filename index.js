const fs = require('fs');
const http = require('http');

const routes = ["/"]

async function readFile(path) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, 'utf8', function (err, data) {
            if (err) {
                reject(err);
            }
            resolve(data);
        });
    });
}

http.createServer(async function (req, res) {
    try {
        res.writeHead(200, { 'Content-Type': 'text/html' }); // http header
        const url = req.url;
        const method = req.method
        if (routes.includes(url) === false) {
            res.statusCode = 404
            res.write(`<h1>${res.statusCode} Page Introuvable</h1>`);
            res.end();
        }
        else if (url === '/' && method === "GET") {

            const content = await readFile(`${__dirname}/public/pages/index.html`)
            res.write(content);
            res.end();
        } else if (url === '/' && method !== "GET") {
            res.statusCode = 403
            res.write(`<h1>${res.statusCode} Méthode non authorisée</h1>`);
            res.end()
        }

    } catch (error) {
        console.log(error)
        res.statusCode = 500
        res.write(`<h1>${res.statusCode} Erreur Interne au Serveur</h1>`);
        res.end()
    }

}).listen(5000);
