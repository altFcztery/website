const fs = require('fs');
const path = require('path');

class Component {
    constructor(type, data) {
        this.type = type
        this.data = data
    }

    get template() {
        let component = fs.readdirSync(path.join(__dirname, '../../src/components'),{ withFileTypes: true })
            .filter(dirent => dirent.isDirectory())
            .map(dirent => dirent.name)
            .find(e => e == this.type);
        if (!!component) {
            if (!fs.existsSync(path.join(__dirname, `../../src/components/${this.type}/controller.js`)))
                return fs.readFileSync(path.join(__dirname, `../../src/components/${this.type}/template.html`), "utf8");
            const CONTROLLER = require(path.join(__dirname, `../../src/components/${this.type}/controller.js`))
            return new CONTROLLER.Renderer(this.data).template
        }
    }
}

module.exports = { Component }