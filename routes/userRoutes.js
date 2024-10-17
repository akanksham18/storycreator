const express = require('express')
const { getAllUsers, registerController, loginController } = require('../controllers/userController')

//router object
const router = express.Router();

//get all users
router
    .get('/all-users', getAllUsers);

//create user || GET
router
    .post('/register', registerController);

//login || post
router
    .post('/login', loginController);

module.exports = router