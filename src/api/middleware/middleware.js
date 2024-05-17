const express = require("express");
const bodyParser = require("body-parser");
const pino = require("pino-http")();
const categoryRouter = require("../routes/category");
const subCategoryRouter = require("../routes/subcategory");
const itemRouter = require("../routes/item");

const setupRoutesAndMiddlewares = (app) => {
  // basic middlewares
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  // logger
  app.use(pino);

  // status check
  app.get("/status", (req, res) => {
    res.status(200).json({ status: "OK" });
  });

  // setup routes
  app.use("/api/v1/category", categoryRouter);
  app.use("/api/v1/subcategory", subCategoryRouter);
  app.use("/api/v1/item", itemRouter);

  // setup error handler
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something broke!");
  });

  // handle 404
  app.use((req, res, next) => {
    res.status(404).json({ error: "Not found" });
  });
};

module.exports = setupRoutesAndMiddlewares;
