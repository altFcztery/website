require('dotenv').config({ path: '.env.local' });
require('dotenv').config();
const cheerio = require('cheerio');
const mysql = require('mysql');

class Conn {
    constructor(query) {
        this.query = query
        this.conn = mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_DATABASE
        })
    }
    connectionHtml(html,callback) {
        const HTML = cheerio.load(html);
        let query = HTML("connection").getAttribute("query");
        this.conn.connect(function (err) {
            if (err) { logger.log(err, "ERROR"); return }
            conn.query(query,function (err, result, fields){
                if (err) { logger.log(err.sqlMessage, "ERROR"); return }
                console.log(result)
            })
        });
        return HTML.html();
    }
}

module.exports = { Conn }