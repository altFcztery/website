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
    var action = request.pathname;
    /**
     * Handling routes
     */
    let route = ROUTES.find(e => e.route === action);
    let contentType = "text/html";
    if (!!route) {
        logger.log("Rendering route: " + route.name);
        fs.readFile(route.template, ((err, content) => {
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
            res.end(HTML.html());
        }))
        return;
    }
    /**
     * Serving assets
     */
    res.writeHead(200, {
        "Content-Type": getHeaderType(path.extname(action))
    });
    fs.readFile(path.join(__dirname, `./src/${action}`),
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
    }
    return contentType;
}

/**
 * Discord Bot
 */
const Discord = require('discord.js');
const client = new Discord.Client({
    intents: [
        Discord.GatewayIntentBits.Guilds,
        Discord.GatewayIntentBits.GuildMessages,
    ]
});
client.on('ready', () => {
    logger.log(`Logged in as ${client.user.tag}!`);
});


/**
 * Must stay at the bottom of the script
 */
if (!!process.env.DISCORD_TOKEN) client.login(process.env.DISCORD_TOKEN);