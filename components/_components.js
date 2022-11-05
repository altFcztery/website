const fs = require('fs');
const path = require('path');

const COMPONENTS = JSON.parse(fs.readFileSync(path.join(__dirname, "_components.json")));

class Component {
    constructor(type) {
        this.type = type
    }

    get template() {
        let component = COMPONENTS.find(e => e.type === this.type);
        if (!!component) {
            return fs.readFileSync(path.join(__dirname, component.files + "/template.html"),"utf8");
        }
    }
}

module.exports = { Component }