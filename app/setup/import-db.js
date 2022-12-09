require('dotenv')
require('dotenv').config({ path: '.env.local' });
const path = require('path')
const fs = require('fs')
const mysql = require("run-my-sql-file")

mysql.connectionOptions({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE
});

mysql.runFile(path.join(__dirname, './db-snapshot.sql'), (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Script sucessfully executed!");
    }
});