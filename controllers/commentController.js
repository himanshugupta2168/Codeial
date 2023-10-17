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
module.exports.deletecomment = async (req, res)=>{
    try{
        const toDeleteComment = await comment.findById({_id:req.params.id});
        const affectedPost = await Post.findById({_id:toDeleteComment.post});
        if (toDeleteComment.user == req.user.id || req.user.id== affectedPost.users){
            const deletedComment = await comment.findByIdAndDelete({_id:toDeleteComment._id});
            const Updatedpost = await Post.findByIdAndUpdate(toDeleteComment.post, {$pull:{comments:deletedComment._id}});
            return res.redirect('back');

        }else{
            return res.redirect("back");
        }

    }
    catch(err){
        console.log("erro in deleting the comment ",err);

    }
}