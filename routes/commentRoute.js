const express = require('express');
const router= express.Router();

const Passport= require('passport')



const commentControllers = require("../controllers/commentController");
const passport = require('passport');

router.post("/create",Passport.checkAuthentication,commentControllers.create);


module.exports= router;