const User= require("../models/user")

module.exports.profile= (req, res)=>{
    res.render('user_profile')
    
}
//  render the sign up page 
module.exports.signUp = async(req, res)=> {
    if (req.isAuthenticated()){
        return res.redirect('/users/profile')
    }
    return res.render('user_sign_up', {
        title: "Codeial | Sign Up", 
    });
}


// render the sign in page 
module.exports.signIn= (req, res)=>{
    if (req.isAuthenticated()){
       return  res.redirect('/users/profile')
    }
    return res.render('user_sign_in', {
        title: "Codeial | Sign In"
    });
}
// adding data from the signup page to the db 
module.exports.create= async (req, res)=>{
    // TODO
    try
    {   
        const Reqemail = req.body.email;
        // console.log(req.body);
        const existingUser= await User.findOne({email: Reqemail});
        if (req.body.password=== req.body.confirm_password){
            if (existingUser){
                res.redirect('back');
            }
            else{
                const newUser = await User.create(req.body);
                res.redirect('back');
            }
        }
        else{
            res.redirect('back')
        }
    }
    catch(error){
        console.log("error in Signing in ", err);
    }
}
//  adding data from the signup page to cfreate sesssion
module.exports.createSession= async(req, res)=>{
    // todo
    return res.redirect('/');
}
module.exports.destroysession= (req , res)=>{
   req.logout(function (err){
    if (err){
        return next(err);
    }
    res.redirect('/');
   });
}