const express = require('express');
require("dotenv").config();
const port =  process.env.PORT || 8000;
const cookieParser = require("cookie-parser")
const app = express();
const expressLayouts= require("express-ejs-layouts")
const mongoose= require("mongoose");
const dbConnect= require("./config/database")
//  used for session cookie and authentication 
const session = require('express-session')
const passport =  require('passport');
const passportLocal = require('./config/passport-local-strategy');
const mongoStore= require('connect-mongo');
const sassMiddleware = require('node-sass-middleware');


app.use(express.urlencoded())
app.use(express.json());
app.use(cookieParser());
app.use(express.static('./assets'));
        // app.use(expressLayouts);
        // app.set('layout extractStyles', true);
        // app.set('layout extractScripts', true);

app.use(sassMiddleware({
    src:'./assets/scss',//source of the scss file 
    dest:'./assets/css',// destination where the file is to be added 
    debug:true,// to get all the bugs reported to be resolved 
    outputStyle:'extended',// to get the css in a singlr line or multiple lines 
    prefix:'/css'
        
}));

// set the views 
app.set('view engine', 'ejs');
app.set('views', "./views");
app.use(session({
    name:'Codeial', 
    // ToDo change  the secret before deploying in production mode 
    secret:'jdsfnskbndjsadbzbkfsd',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60 *100)
    },
    store:mongoStore.create(
        {mongoUrl:process.env.MONGODB_URL,
        autoRemove:'disabled',
        },
        (err)=>{
            console.log(err);
        }
    )
}));
app.use(passport.initialize());
app.use(passport.session ());
app.use(passport.setAuthenticatedUser);


// use express router 
app.use('/',require('./routes/index') )

app.listen(port, (err)=>{
    if (err){
        console.log(`error in running server ${err}`);
    }
    console.log(`Server  running on port ${port}`);
});
dbConnect();