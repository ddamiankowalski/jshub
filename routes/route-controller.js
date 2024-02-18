const fs = require('fs');
const { SSRController } = require('../ssr/ssr-controller');

class RouteController {
  constructor(app, api) {
    this.ssrController = new SSRController(api);
    this._app = app;
  }

  listen() {
    this._app.get('/', async (req, res) => 
      res.send(await this.ssrController.parsePage('home')));
  }
}

module.exports = {
  RouteController
};