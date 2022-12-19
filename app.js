require('dotenv').config({ path: '.env.local' });
require('dotenv').config();
const express = require('express');
const path = require('path');
const fs = require('fs');
const url = require('url');
const cheerio = require('cheerio');
const components = require(path.join(__dirname, "app/scripts/components.js"))
const loggerModule = require(path.join(__dirname, "app/scripts/logger.js"))
const connection = require(path.join(__dirname, "app/scripts/connection.js"))

const logger = new loggerModule.Logger()
const ROUTES = JSON.parse(fs.readFileSync(path.join(__dirname, "app/config/routes.json")));

const app = express();

app.get('*', (req, res) => {
    console.log(req);
    let request = url.parse(req.url, true);
    let pathname = request.pathname;

    /**
     * Handling routes
     */
    let contentType = 'text/html';
    let route = ROUTES.find((e) => e.route === pathname);
    res.setHeader('Content-Type', getHeaderType(path.extname(pathname)));
    if (!!route) {
        logger.log(`Rendering route: ${route.name}`);
        if (!!route.controller) {
            const controller = require(path.join(__dirname, route.controller));
            res.send(prepareHtml(new controller.Controller(req).template));
            return;
        }
        fs.readFile(route.template, ((err, content) => {
            res.send(prepareHtml(content));
        }));
        return;
    }
    /**
     * Serving assets
     */
    fs.readFile(path.join(__dirname, `./src/${pathname}`), (err, content) => {
        if (err) {
            res.status(404).send('404 Not Found');
            return;
        }
        res.send(content);
    });
});

app.listen(process.env.SERVER_PORT, () => {
    logger.log(`Listening for requests at port: ${process.env.SERVER_PORT}`);
});
/**
 * Rendering components and db connections
 */
function prepareHtml(content) {
    const HTML = cheerio.load(content);
    HTML("component").replaceWith(function () {
        return new components.Component(HTML(this).attr("type"), HTML(this).data()).template
    });
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
    const extensionToContentTypeMap = {
      '.html': 'text/html',
      '.css': 'text/css',
      '.js': 'application/javascript',
      '.json': 'application/json',
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.gif': 'image/gif',
      '.ico': 'image/x-icon',
    };
  
    return extensionToContentTypeMap[ext] || 'text/plain';
  }

require(path.join(__dirname, "./app/scripts/discord"));