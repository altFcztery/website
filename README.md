## INSTALL: ##
**Requires node.js**
***Commands to set up project:*** 
```
1.   npm install
```

**Start server: `npm start` - run server at localhost:8080**

## Create routes in: `app/config/routes.json` file
```
{
   name: unique id,
   route: route url,
   template: path to html file,
   controller: path to controller script leave empty if no custom logic / form handling,
   permissions: parmissions needed to access route (W.I.P)
}
```
##### After seting up route go to `localhost:8080/{route}` - server will render `{template}` file

## Components: ##
To add component go to `src/components`
Create new folder with name of the component
Create `template.html` file inside with the component html code
If you want to add custom logic to component create `controller.js` inside the component folder
**Component controller Template**
```
   const cheerio = require('cheerio');
   const fs = require('fs');
   const path = require('path');

   class Renderer {
       constructor(data) {
           this.data = data; // all data atributes of the component
       }
       get template() {
           const HTML = cheerio.load(fs.readFileSync(path.join(__dirname, 'template.html')));
            // Custom logic here
           return HTML.html(); // return template file after logic changes
       }
   }

module.exports = { Renderer }
```

## Template Controllers: ##
**IMPORTANT: only works if route has declared controller script in the `routes.json` file**
Add `.js` file to `src/controllers/`
```
   require('dotenv').config({ path: '.env.local' });
   require('dotenv')
   const cheerio = require('cheerio')
   const path = require('path')
   const fs = require('fs')

   class Controller {
       constructor(request) {
           this.request = request; // http request
       }
       get template() {
            // Custom logic here
           return fs.readFileSync(path.join(__dirname, '../templates/index.html')) // return template file after logic changes
       }
   }

   module.exports = { Controller }
```
