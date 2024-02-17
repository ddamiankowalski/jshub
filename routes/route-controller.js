const fs = require('fs');
const { SSRController } = require('../ssr/ssr-controller');

class RouteController {
  constructor(app) {
    this.ssrController = new SSRController();
    this.app = app;
  }

  listen() {
    this.app.get('/', async (req, res) => 
      res.send(await this.ssrController.parsePage('home')));
  }
}

module.exports = {
  RouteController
};