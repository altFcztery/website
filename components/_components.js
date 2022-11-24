const fs = require('fs');
const path = require('path');

class Component {
    constructor(type, data) {
        this.type = type
        this.data = data
    }

    get template() {
        let component = fs.readdirSync(__dirname, { withFileTypes: true })
            .filter(dirent => dirent.isDirectory())
            .map(dirent => dirent.name)
            .find(e => e == this.type);
        if (!!component) {
            if (!fs.existsSync(path.join(__dirname, this.type + "/renderer.js")))
                return fs.readFileSync(path.join(__dirname, this.type + "/template.html"), "utf8");
            //TODO: Custom rendering for components
            const CONTROLLER = require(path.join(__dirname, this.type + "/renderer.js"))
            return new CONTROLLER.Renderer(this.data).template
        }
    }
}

module.exports = { Component }