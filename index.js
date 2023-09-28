const express = require('express');
require("dotenv").config();
const port =  process.env.PORT || 8000;
const cookieParser = require("cookie-parser")
const app = express();
const expressLayouts= require("express-ejs-layouts")
const mongoose= require("mongoose");
const dbConnect= require("./config/database")

app.use(express.urlencoded())
app.use(express.json());
app.use(cookieParser());
app.use(express.static('./assets'));
        // app.use(expressLayouts);
        // app.set('layout extractStyles', true);
        // app.set('layout extractScripts', true);

// use express router 
app.use('/',require('./routes/index') )




// set the views 
app.set('view engine', 'ejs');
app.set('views', "./views");
app.listen(port, (err)=>{
    if (err){
        console.log(`error in running server ${err}`);
    }
    console.log(`Server  running on port ${port}`);
});
dbConnect();