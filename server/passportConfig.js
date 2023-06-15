const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
require('dotenv').config()

//import User model for local strategy
const User = require('./models/Users')

/* -------------------- LOCAL STRATEGY -------------------------------------- */

passport.use(
  new LocalStrategy(
    { usernameField: 'email' },
    function(email, password, done) {
    User.findOne({ email })
      .then(user => {
        if(!user){
          return done(null, false);
        }
        bcrypt.compare(password, user.password, (err,isMatch) => {
          if(err) throw(err)

          if (isMatch) {
            return done(null,user)
          } else {
            return done(null, false, { message: "Wrong password!" })
          }
        })
      }).catch(err => {
        return done(null, false, { message: err })
      })
  }
))

/*-------------------- SERIALISE AND DESERIALISE USERS ------------------------- */

passport.serializeUser((user, cb) => {
  console.log(user._id)
  return cb(null, user._id)
});

passport.deserializeUser(async(id, cb) => {
 try {
    const user = await User.findById(id);
    //omitting password otherwise we will make a big OOPSIE
    const { password, ...userInfo } = user._doc
    cb(null, userInfo);
  } catch(err) {
    cb(err);
  };
});
