const express = require("express");

const { RouteController } = require("./routes/route-controller");
const { ApiController } = require('./backend/api-controller');

const app = express();
const port = 3000;

app.use(express.static('public'))
app.use(express.json());

const api = new ApiController();
app.use('/api', api.getApp());

const controller = new RouteController(app, api);

controller.listen();

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});