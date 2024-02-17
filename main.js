const express = require("express");

const { RouteController } = require("./routes/route-controller");

const app = express();
const port = 3000;

app.use(express.static('public'))

const controller = new RouteController(app);
controller.listen();

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});