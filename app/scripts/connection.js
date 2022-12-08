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
        let result = syncSql.mysql(this.conn, this.query)
        logger.log(`New database query: "${this.query}"`)
        let resultHtml = "";
        for (const res of result.data.rows) {
            let tempHtml = cheerio.load(html);
            for (const key of Object.keys(res)) {
                tempHtml(`result[key=${key}]`).replaceWith(function () {
                    return setType(tempHtml(this).attr('type'), res[key]);
                });
            }
            resultHtml += tempHtml.html()
        }
        return resultHtml;
    }
}

function setType(type, value) {
    value = String(value)
    switch (type) {
        case "image":
            return `<img src='${value}'>`;
        case "ahref":
            return `<a href='${value}'></a>`;
        case "text":
        default:
            return value;
    }
}

module.exports = { Conn }