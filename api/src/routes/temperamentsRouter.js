const { Router } = require("express");

const { getTemperamentsHandler } = require("../handlers/temperamentsHandler");

const temperamentRouter = Router();

temperamentRouter.get("/", getTemperamentsHandler);

module.exports = temperamentRouter;
