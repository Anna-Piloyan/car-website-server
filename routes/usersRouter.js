const express = require("express");
const jsonParser = express.json();
const userController = require('../controllers/userController')
const usersRouter = express.Router();



usersRouter.post("/register", jsonParser, userController.registerUser)
usersRouter.post("/login", jsonParser, userController.loginUser)



module.exports = usersRouter