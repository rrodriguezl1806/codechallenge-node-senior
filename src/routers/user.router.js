const express = require('express');
const api = express.Router()
const userController = require('../controllers/user')
const {validateUser} = require("../validators/userValidator");

// Get all users
api.get('/getusers', userController.getUsers)

// Get user by userId
api.get('/getusersById/:userId', userController.getUserById)

// Create new user
api.post('/createUsers', validateUser , userController.createUser)

// Update user by userId
api.put('/updateUsersById/:userId', validateUser, userController.updateUser)

// Delete user by userId
api.delete('/deleteUsersById/:userId', userController.deleteUser)

module.exports = api