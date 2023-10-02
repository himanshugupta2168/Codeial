const express = require('express')
const router= express.Router();
const userController = require("../controllers/users-controller")
const passport= require('passport');



router.get('/profile',passport.checkAuthentication, userController.profile);
router.get('/signup', userController.signUp);
router.get('/signin', userController.signIn);
router.post('/create', userController.create);
// use passport as a middleware to authenticate 
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect:'/users/signin'})
    ,userController.createSession);
router.get('/signout', userController.destroysession);

module.exports= router;
