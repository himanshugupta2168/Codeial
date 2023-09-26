const express = require('express');
const router = express.Router();

const homeController= require("../controllers/home_controller")
router.get('/',homeController.home)
router.use('/users', require('./users'))
router.use('/assignment', require('./Assignment'))


//  for any other routes accessible from here 


module.exports= router;
