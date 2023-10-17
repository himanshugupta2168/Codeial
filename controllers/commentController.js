const Post =  require("../models/post");
const comment= require("../models/comment");


module.exports.create= async function (req, res){
    try{
        const {content , post }= req.body;
        const user = req.user._id;
        const savedComment = await comment.create({
            content:content, 
            post:post,
            user:user,
        })
        const updatedPost = await Post.findByIdAndUpdate(post, {$push:{comments:savedComment._id}}, {new:true})
        return res.redirect("back");
    }
    catch(err){
        console.log("error in  creating a comment ", err);
        return res.redirect("/");
    }
}