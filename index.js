const express = require("express");
const setupRoutesAndMiddlewares = require("./src/api/middleware/middleware");
const app = express();
const config = require("./src/config/config");
require("./src/database/connection");
const menuRouter = require("./src/api/routes/category");

setupRoutesAndMiddlewares(app);

app.listen(config.PORT, () => {
  console.log(`Server is running on port ${config.PORT}`);
});
