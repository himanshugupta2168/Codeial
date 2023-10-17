const express = require('express');
const router = express.Router();
// const passport= require("passport");
// const passportLocalAuth

const postController = require("../controllers/postController");
const passport = require('passport');

router.post("/create",passport.checkAuthentication, postController.create);
router.use("/comments", require("./commentRoute"));
router.get('/deletepost/:id', passport.checkAuthentication, postController.deletepost);


module.exports= router;