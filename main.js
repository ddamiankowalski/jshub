const express = require("express");

const { RouteController } = require("./routes/route-controller");
const { ResourceController } = require('./backend/resource-controller');

const app = express();
const port = 3000;

app.use(express.static('public'))

const resource = new ResourceController();
const controller = new RouteController(app, resource);

controller.listen();

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});