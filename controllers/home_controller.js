// const cookieParser = require("cookie-parser")

module.exports.home= async(req, res)=>{
   console.log(req.cookies)
//    res.cookie("user_id", 25);
    return res.render('home', {
        title: "Home Page ",
    }) 
}