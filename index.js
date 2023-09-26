const express = require('express');
require("dotenv").config();
const port =  process.env.PORT || 8000;
const app = express();
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


