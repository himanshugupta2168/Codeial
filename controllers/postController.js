const Post = require("../models/post")
const comment = require("../models/comment")


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


module.exports.deletepost = async(req, res)=>{
    try{
        const toDeletePost = await Post.findById({_id:req.params.id});
        if (toDeletePost.users==req.user.id){
            const deletedpost = await Post.deleteOne({_id: toDeletePost._id});

            const todeleteComment = await comment.deleteMany({post:toDeletePost._id});


            return res.redirect('back');

        }
        else{
            return res.redirect('back');
        }

    }
    catch(err){
        console.log("error in deleting the post ", err);
        return res.redirect('back');
    }
}