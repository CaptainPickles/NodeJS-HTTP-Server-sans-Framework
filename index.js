const fs = require('fs');
const http = require('http');

const routes = ["/", "/public/images/image.jpg", "/public/css/style.css", "/public/js/script.js", "/api/names"]


async function readFile(path) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, function (err, data) {
            if (err) {
                reject(err);
            }
            resolve(data);
        });
    });
}

http.createServer(async function (req, res) {
    try {
        const memoryDb = new Map(); // est global
        let id = 0; // doit être global
        memoryDb.set(id++, { nom: "Alice" }) // voici comment set une nouvelle entrée.
        memoryDb.set(id++, { nom: "Bob" })
        memoryDb.set(id++, { nom: "Charlie" })
        res.writeHead(200, { 'Content-Type': 'text/html' }); // http header
        const url = req.url;
        const method = req.method
        if (routes.includes(url) === false && url.startsWith("/public/") === false && url.startsWith("/api/name/") === false) {
            res.statusCode = 404
            res.writeHead(res.statusCode)
            const content = await readFile(`${__dirname}/public/pages/notFound.html`)
            res.write(content);
            res.end();
        } else if (url.startsWith("/public/")) {
            const urlSplit = url.split("/")
            const extension = urlSplit[2]
            const fileName = urlSplit[3]
            const content = await readFile(`${__dirname}/public/${extension}/${fileName}`)
            res.write(content);
            res.end();
        }
        else if (url === '/' && method === "GET") {
            const content = await readFile(`${__dirname}/public/pages/index.html`)
            res.write(content);
            res.end();
        } else if (url === '/' && method !== "GET") {
            res.statusCode = 403
            res.writeHead(res.statusCode)
            const content = await readFile(`${__dirname}/public/pages/unauthorized.html`)
            res.write(content);
            res.end()
        } else if (url === "/api/names" && method === 'GET') {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            const json = Object.fromEntries(memoryDb);
            res.write(JSON.stringify(json))
            res.end()
        } else if (url.startsWith("/api/name/") && method === 'GET') {
            console.log("test")
            res.write("test")
            res.end()
        }

    } catch (error) {
        console.log(error)
        res.statusCode = 500
        res.writeHead(res.statusCode)
        const content = await readFile(`${__dirname}/public/pages/serverError.html`)
        res.write(content);
        res.end()
    }

}).listen(5000);
