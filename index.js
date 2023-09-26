const express = require('express');
require("dotenv").config();



const port =  process.env.PORT || 8000;
const app = express();



app.listen(port, (err)=>{
    if (err){
        console.log(`error in running server ${err}`);
    }
    console.log(`Server  running on port ${port}`);
});


