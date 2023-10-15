// const cookieParser = require("cookie-parser")
const Post = require("../models/post");
// const   User= require("../models/user")

module.exports.home= async(req, res)=>{
    try{
        console.log(req.cookies)
        const posts = await Post.find({}).populate("users").exec();
        // console.log(posts.content);


//    res.cookie("user_id", 25);
        return res.render('home', {
        title: "Home Page ",
        posts:posts,

    }) 

    }
    catch(err){
        console.log("error in sending feed", err);
        return res.redirect("back");

    }
}