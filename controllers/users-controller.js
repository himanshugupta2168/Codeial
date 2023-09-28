const User= require("../models/user")

module.exports.profile= (req, res)=>{
    res.send("<h1> Hello from the profile router page </h1>")
    res.end();
}
//  render the sign up page 
module.exports.signUp = async(req, res)=> {
    return res.render('user_sign_up', {
        title: "Codeial | Sign Up", 
    });
}


// render the sign in page 
module.exports.signIn= async(req, res)=>{
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
}