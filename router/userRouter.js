const UserController = require('../controller/UserController');

const userRoutes = require('express').Router();

userRoutes.post("/login", UserController.Login);
userRoutes.post("/register", UserController.Register);

module.exports = userRoutes