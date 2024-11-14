const UserController = require('../controller/UserController');

const userRoutes = require('express').Router();

userRoutes.post("/login", UserController.Login);

module.exports = userRoutes