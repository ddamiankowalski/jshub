const fs = require('fs');
const { SSRController } = require('../ssr/ssr-controller');

class RouteController {
  constructor(app, resource) {
    this.ssrController = new SSRController();
    this._app = app;
    this._resource = resource;
  }

  listen() {
    this._app.get('/', async (req, res) => 
      res.send(await this.ssrController.parsePage('home')));
  }
}

module.exports = {
  RouteController
};