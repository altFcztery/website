const fs = require('fs');
const path = require('path');

// For todays date;
Date.prototype.today = function () {
    return ((this.getDate() < 10) ? "0" : "") + this.getDate() + "-" + (((this.getMonth() + 1) < 10) ? "0" : "") + (this.getMonth() + 1) + "-" + this.getFullYear();
}

// For the time now
Date.prototype.timeNow = function () {
    return ((this.getHours() < 10) ? "0" : "") + this.getHours() + ":" + ((this.getMinutes() < 10) ? "0" : "") + this.getMinutes() + ":" + ((this.getSeconds() < 10) ? "0" : "") + this.getSeconds();
}

Date.prototype.now = function () {
    return `${this.today()}_${this.timeNow()}`
}

class Logger {
    constructor() {
        this.timestamp = new Date().now().replace(":", ".")
        this.log("Started logging!")
    }
    log(message, type = "MESSAGE") {
        let mess = `[${new Date().timeNow()}.${new Date().getMilliseconds()}] [${type}]: ${message}`
        fs.appendFile(path.join(__dirname, `../logs/${this.timestamp}.log`), `${mess}\n`, (err) => { if (err) throw err })
        console.log(mess)
    }
}

module.exports = { Logger }