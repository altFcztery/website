require('dotenv').config({ path: '.env.local' });
require('dotenv')
const cheerio = require('cheerio')
const path = require('path')
const fs = require('fs')
const mysql = require('mysql')
const { parse } = require('querystring');
const Auth = require(path.join(__dirname, '../../../app/scripts/auth.js'))
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
                if (Object.values(body).every((e) => { return !!e })) {
                    new Auth.Auth().register(body, (err) => {
                        if (err) { console.error(err); return }
                    })
                }
            });
        }
        return fs.readFileSync(path.join(__dirname, '../../templates/register.html'))
    }
}

module.exports = { Controller }