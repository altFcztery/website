const HTTP = require('http');
const FS = require('fs');

const ROUTES = JSON.parse(FS.readFileSync("server/routes.json"));

/**
 * Creating server
 */
HTTP.createServer((req, res) => {
    let url = req.url;
    let route = ROUTES.find(e => e.route === url);
    if (!!route) {
        console.log("Rendering route: " + route.name);
        res.write(FS.readFileSync(route.template));
    }
    // 404 - not found
    res.end();
}).listen(3000, () => { console.log('Listening for requests at port: 3000'); });