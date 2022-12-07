require('dotenv').config({ path: '.env.local' });
require('dotenv').config();
const cheerio = require('cheerio');
const syncSql = require('sync-sql');
const path = require('path');
const loggerModule = require(path.join(__dirname, "./logger.js"))
const logger = new loggerModule.Logger()

class Conn {
    constructor(query) {
        this.query = query
        this.conn = {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_DATABASE
        }
    }
    connectionHtml(html) {
        const HTML = cheerio.load(html);
        let result = syncSql.mysql(this.conn,this.query)
        logger.log(`New database query: "${this.query}"`)
        let resultHtml = "";
        for (const res of result.data.rows) {
            let tempHtml = HTML;
            for (const key of Object.keys(res)) {
                tempHtml(key).replaceWith(`<div>${res[key]}</div>`);
            }
            resultHtml += tempHtml.html()
        }
        return resultHtml;
    }
}

module.exports = { Conn }