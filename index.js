require('dotenv').config();
const http = require('http');
const path = require('path');
const fs = require('fs');
const url = require('url');

const ROUTES = JSON.parse(fs.readFileSync("config/routes.json"));

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
        console.log("Rendering route: " + route.name);
        fs.readFile(route.template, ((err, content) => {
            res.end(content);
        }))
        return;
    }
    /**
     * Serving assets
     */
    var filePath = path.join(__dirname, action).split("%20").join(" ");
    fs.exists(filePath, function (exists) {
        if (!exists) {
            console.log(filePath);
            res.writeHead(404, {
                "Content-Type": contentType,
            });
            res.end("404 Not Found");
            return;
        }
        var ext = path.extname(action);

        res.writeHead(200, {
            "Content-Type": getHeaderType(ext)
        });
        fs.readFile(filePath,
            function (err, content) {
                res.end(content);
            });
    });
}).listen(process.env.SERVER_PORT, () => { console.log('Listening for requests at port: ' + process.env.SERVER_PORT); });

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
    }
    return contentType;
}

/**
 * Discord Bot
 */
const Discord = require('discord.js');
const client = new Discord.Client({
    intents: [
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MESSAGES,
    ]
});
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});


/**
 * Must stay at the bottom of the script
 */
client.login(process.env.DISCORD_TOKEN);
console.log(process.env.DISCORD_TOKEN)