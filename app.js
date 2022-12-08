require('dotenv').config({ path: '.env.local' });
require('dotenv').config();
const http = require('http');
const path = require('path');
const fs = require('fs');
const url = require('url');
const cheerio = require('cheerio');
const components = require(path.join(__dirname, "app/scripts/components.js"))
const loggerModule = require(path.join(__dirname, "app/scripts/logger.js"))
const connection = require(path.join(__dirname, "app/scripts/connection.js"))

const logger = new loggerModule.Logger()
const ROUTES = JSON.parse(fs.readFileSync(path.join(__dirname, "app/config/routes.json")));

/**
 * Creating server
 */
http.createServer((req, res) => {
    let request = url.parse(req.url, true);
    let pathname = request.pathname;
    /**
     * Handling routes
     */
    let contentType = "text/html";
    let route = ROUTES.find(e => e.route === pathname);
    res.writeHead(200, {
        "Content-Type": getHeaderType(path.extname(pathname))
    });
    if (!!route) {
        logger.log("Rendering route: " + route.name);
        if (!!route.controller) {
            const controller = require(path.join(__dirname, route.controller))
            res.end(prepareHtml(new controller.Controller(req).template))
            return;
        }
        fs.readFile(route.template, ((err, content) => {
            res.end(prepareHtml(content));
        }))
        return;
    }
    /**
     * Serving assets
     */
    fs.readFile(path.join(__dirname, `./src/${pathname}`),
        function (err, content) {
            if (err) {
                res.writeHead(404, {
                    "Content-Type": contentType,
                });
                res.end("404 Not Found");
                return;
            }
            res.end(content);
        });
}).listen(process.env.SERVER_PORT, () => {
    logger.log('Listening for requests at port: ' + process.env.SERVER_PORT);
});
/**
 * Rendering components and db connections
 */
function prepareHtml(content) {
    const HTML = cheerio.load(content);
    /**
     * Rendering components
     */
    HTML("component").replaceWith(function () {
        return new components.Component(HTML(this).attr("type"), HTML(this).data()).template
    });
    /**
     * Database connection
     */
    HTML("connection").replaceWith(function () {
        return new connection.Conn(HTML(this).attr("query"))
            .connectionHtml(HTML(this).html());
    });
    return HTML.html()
}

/**
 * Setting heders for assets by extension
 */
function getHeaderType(ext) {
    switch (ext) {
        case ".png":
        case ".jpg":
            contentType = "image/png";
            break;
        case ".css":
            contentType = "text/css"
            break;
        case ".js":
            contentType = "application/javascript"
            break;
        case ".json":
            contentType = "application/json"
            break;
        default:
            contentType = "text/html"
    }
    return contentType;
}

require(path.join(__dirname, "./app/scripts/discord"));