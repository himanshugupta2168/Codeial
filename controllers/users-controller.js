const User= require("../models/user")

module.exports.profile= async (req, res)=>{
    try{
        if(req.cookies.user_id){
            // console.log(req.cookies.user_id);
            const person = await User.findById(req.cookies.user_id);
            console.log(person.name)
            res.render('profile', {
                user:person
            })
        }
        else{
            return res.redirect('/');
        }
    }
    catch{
        console.log("error");
    }
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
    //  find the user 
    try{
        const Reqemail = req.body.email;
        const ReqPass= req.body.password;
        const Verify = await User.findOne({email:Reqemail});
        if (!Verify){
            res.redirect('/users/signup');
        }
        if(ReqPass===Verify.password){
            res.cookie('user_id',Verify.id);
            res.redirect('/users/profile');

        }
        else{
            res.redirect('/users/signin')
        }

        
    }
    catch{
        console.log("error in finding the person in the database ")
    }

    //  handle the user 
    // handle user with passworn not matching   
    //  handle user not found 

}


//  signing out the user 

module.exports.signOut = (req, res) => {
    try {
      // Clear the user_id cookie to log the user out
      res.clearCookie('user_id');
      
      // Redirect to the home page or any other appropriate page after sign-out
      res.redirect('/');
    } catch (error) {
      console.error("Error while signing out: ", error);
      // Handle the error, possibly by redirecting to an error page
      res.redirect('/error');
    }
  };