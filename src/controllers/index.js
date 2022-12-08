require('dotenv').config({ path: '.env.local' });
require('dotenv')
const cheerio = require('cheerio')
const path = require('path')
const fs = require('fs')

class Controller {
    constructor(request) {
        this.request = request;
    }
    get template() {
        return fs.readFileSync(path.join(__dirname, '../templates/index.html'))
    }
}

module.exports = { Controller }