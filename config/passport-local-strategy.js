const passport= require('passport');
const User = require('../models/user');
const LocalStrategy = require('passport-local').Strategy;
// const User= require('../models/user');

// use to authenticate 
passport.use(new LocalStrategy({
    usernameField: 'email',
  },
  async function(email, password, done) {
    try {
      const user = await User.findOne({ email: email });
      if (!user || user.password !== password) {
        console.log('Invalid Username/Password');
        return done(null, false);
      }
      return done(null, user);
    } catch (err) {
      console.log('Error in finding user ---> Passport');
      return done(err);
    }
  }
));

//  serializing the user  to decide which key to be kept in the cookies 
passport.serializeUser(function(user, done){
    done(null, user.id);
});
// / deserializing the user from the keys in the cookie

passport.deserializeUser(async function(id, done) {
    try {
        const user = await User.findById(id);
        if (!user) {
            return done(null, false); // User not found
        }
        return done(null, user); // User found and deserialized
    } catch (err) {
        console.log("Error in finding the user:", err);
        return done(err);
    }
});



// check if the user is authenticated 

passport.checkAuthentication = function(req, res, next ){
  //  if the user is signed in then pass on the request to next function (controler action )
  if (req.isAuthenticated()){
    return next (); 
  }
  //  if the user is not signed in 
  else {
    return res.redirect('/users/signin');
  }
};


passport.setAuthenticatedUser= function(req, res, next ){
  if (req.isAuthenticated()){
    // req.user contains the current signed in user from the session cookies and we are just sending this to the locals for the views 
    res.locals.user= req.user;
  }
  next();
};

module.exports= passport; 