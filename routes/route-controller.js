class RouteController {
  constructor(app, path) {
    this.app = app;
    this.path = path;
  }

  listen() {
    this.app.get('/', (req, res) => {
      res.sendFile(this.path.join(__dirname, 'pages/index.html'));
    });
  }
}

module.exports = {
  RouteController
};