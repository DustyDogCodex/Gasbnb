const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
require('dotenv').config()

//import User model for local strategy
const User = require('./models/Users')

/* -------------------- LOCAL STRATEGY -------------------------------------- */

passport.use(new LocalStrategy({
    usernameField: 'email'
  },
  function(username, password, done) {
    User.findOne({ username: username })
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
  return cb(null, user._id)
});

passport.deserializeUser(async(id, cb) => {
 try {
    const user = await User.findById(id);
    //omitting password otherwise we will make a big OOPSIE
    const { password, ...others } = user._doc
    cb(null, others);
  } catch(err) {
    cb(err);
  };
});
