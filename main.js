const express = require("express");
const path = require('path');

const { RouteController } = require("./routes/route-controller");

const app = express();
const port = 3000;

app.use(express.static('public'))

const controller = new RouteController(app, path);
controller.listen();

app.listen(port, () => {
  console.log('Example app listening');
});