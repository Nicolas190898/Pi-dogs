const { Router } = require("express");

const {getDogs, getOneDog , createDog} = require('../handlers/dogsHandler')
const dogsRouter = Router();

dogsRouter.get("/", getDogs);
dogsRouter.get("/:id", getOneDog);
dogsRouter.post('/' , createDog)
module.exports = dogsRouter;
