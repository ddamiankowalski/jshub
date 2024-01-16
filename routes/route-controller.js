const fs = require('fs');
const { SSRController } = require('../ssr/ssr-controller');

class RouteController {
  constructor(app, path) {
    this.ssrController = new SSRController();
    this.app = app;
    this.path = path;
  }

  listen() {
    this.app.get('/', async (req, res) => {
      const parsed = await this.ssrController.parsePage(this.path.join(__dirname, 'pages/index.html'));
      res.send(parsed);
    });
  }
}

module.exports = {
  RouteController
};