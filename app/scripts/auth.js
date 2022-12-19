require('dotenv').config({ path: '.env.local' });
require('dotenv').config();
const syncSql = require('sync-sql');
const path = require('path');
const bcrypt = require('bcrypt')
const fs = require('fs')

const AUTHCONF = JSON.parse(fs.readFileSync(path.join(__dirname, "../config/auth-config.json")))
String.prototype.lenBetween = function (min, max) {
    return (this.length >= min && this.length <= max)
}


class Auth {
    constructor() {
        this.conn = {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_DATABASE
        }
    }
    register(formValues, callback) {
        let err;
        if (!Object.values(formValues).every((e) => { return !!e })) err = "Form not complete";
        if (this.checkDbForDuplicate("email", formValues.email)) err = "Email arleady in use";
        if (formValues.password != formValues.rpassword) err = "Passwords not the same";
        if (!this.checkUsername(formValues.username)) err = "Invalid Username";
        if (!this.checkPassword(formValues.password)) err = "Invalid Password";
        if (err) { callback(new Error(err)); return }
        bcrypt.genSalt(10, (err, salt) => {
            if (err) { callback(err); return }
            bcrypt.hash("generic", salt, (err, hash) => {
                if (err) { callback(err); return }
                syncSql.mysql(this.conn, `INSERT INTO users (uuid, email, username, password, permissions)
                 VALUES (NULL,'${formValues.email}','${formValues.username}','${hash}','["default"]')`).success
                callback(null)
            });
        });
    }

    login(formValues, callback) {
        if (!Object.values(formValues).every((e) => { return !!e })) return false;
        let query = ""
        let result = syncSql.mysql(this.conn, query)
    }

    checkUsername(username) {
        if (!username.lenBetween(AUTHCONF.username.minLength, AUTHCONF.username.maxLength)) return false;
        if (hasExcludedChars(username, AUTHCONF.username.includedSpecialChars)) return false;
        if (!AUTHCONF.username.canDuplicate)
            if (this.checkDbForDuplicate("username", username)) return false;
        return true;
    }
    checkPassword(password) {
        if (password.length < AUTHCONF.password.minLength) return false;
        if (password.match(/\s/)) return false;
        return true;
    }

    checkDbForDuplicate(what, value) {
        return Boolean(syncSql.mysql(this.conn, `SELECT 1 FROM users WHERE ${what} = "${value}";`).data.rows[0])
    }
}

function hasExcludedChars(str, excludeChars) {
    for (const char of str) {
        if (!/[a-zA-Z0-9]/.test(char) && !excludeChars.includes(char)) {
            return true;
        }
    }
    return false;
}

module.exports = { Auth }