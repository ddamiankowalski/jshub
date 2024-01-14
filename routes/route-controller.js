const fs = require('fs');

class RouteController {
  constructor(app, path) {
    this.app = app;
    this.path = path;
  }

  listen() {
    this.app.get('/', (req, res) => {
      fs.readFile(this.path.join(__dirname, 'pages/index.html'), 'utf-8', (err, data) => {
        const modifiedHTML = data.replaceAll('{{ valuePlaceholder }}', '12');

        const matches = data.match(/\{\{.*?\}\}/g);
        console.log(matches.forEach(match => console.log(match.substring(2, match.length - 2))));

        res.send(modifiedHTML);
      })
    });
  }
}

module.exports = {
  RouteController
};