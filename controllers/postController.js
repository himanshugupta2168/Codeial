const Post = require("../models/post")



module.exports.create= async function(req, res){
    try{
        const content = req.body.content;
        const User = req.user._id ;
        const SavedPost = await Post.create({
            content:content, 
            users:User,
        });
        // if (savedPost) 
        return res.redirect("/");


    }
    catch(err){
        console.log("Error in  Saving the post ", err);
        return res.redirect("/");
    }
}