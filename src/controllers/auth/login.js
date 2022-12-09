require('dotenv').config({ path: '.env.local' });
require('dotenv')
const cheerio = require('cheerio')
const path = require('path')
const fs = require('fs')
const { parse } = require('querystring');

class Controller {
    constructor(request) {
        this.req = request;
    }
    get template() {
        if (this.req.method === 'POST') {
            let body = "";
            this.req.on('data', chunk => {
                body += chunk.toString();
            });
            this.req.on('end', () => {
                body = parse(body)
                console.log(
                    body
                );
            });
        }
        return fs.readFileSync(path.join(__dirname, '../../templates/login.html'))
    }
}

module.exports = { Controller }