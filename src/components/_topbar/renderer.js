const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

const CONFIG = JSON.parse(fs.readFileSync(path.join(__dirname, 'config.json')));

class Renderer {
    constructor(data) {
        this.data = data;
    }
    get template() {
        const HTML = cheerio.load(fs.readFileSync(path.join(__dirname, 'template.html')));
        for (const key of Object.keys(this.data)) {
            HTML(key).replaceWith(CONFIG[key][this.data[key]]);
            console.log(CONFIG[key][this.data[key]])
        }
        return HTML.html();
    }
}

module.exports = { Renderer }