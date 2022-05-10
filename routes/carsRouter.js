const express = require("express");
const jsonParser = express.json();
const carController = require('../controllers/carController')
const carsRouter = express.Router();


carsRouter.post("/", jsonParser, carController.addCar)
carsRouter.get("/", carController.getCars)
carsRouter.get("/:id", carController.getCar)
carsRouter.delete("/:id", carController.deleteCar)
carsRouter.put("/", jsonParser, carController.updateCar)



module.exports = carsRouter