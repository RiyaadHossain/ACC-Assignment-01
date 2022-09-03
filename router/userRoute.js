const express = require('express');
const userController = require('../controller/userController');

const route = express.Router()

route.get("/random", userController.randomUser)
route.get("/all", userController.allUser)
route.post("/save", userController.saveUser)
route.patch("/update", userController.updateUser)
route.patch("/bulk-update", userController.updateRandomUsers)
route.delete("/delete", userController.deleteUser)

module.exports = route