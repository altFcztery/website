require('dotenv').config()
const mysql = require('mysql');

mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE
})

mysql.connect(function (err, conn) {
    if (err) throw err
    console.log('Connected!')
})