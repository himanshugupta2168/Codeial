const express = require('express')
const router= express.Router();
const userController = require("../controllers/users-controller")


router.get('/profile', userController.profile);
router.get('/signup', userController.signUp);
router.get('/signin', userController.signIn);
router.post('/create', userController.create);
// 

module.exports= router;
