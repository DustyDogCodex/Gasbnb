const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

//import User model for local strategy
const User = require('./models/Users')

/* -------------------- LOCAL STRATEGY -------------------------------------- */

passport.use(
  new LocalStrategy(
    { usernameField: 'email' },
    function(email, password, done) {
        User.findOne({ email })
        .then(user => {
            //if no user exists with this account return false
            if(!user){
                return done(null, false);
            }
        
            //if user exists, compare passwords
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if(err) throw(err)

                if (isMatch) {
                    //if passwords match return user document
                    return done(null,user)
                } else {
                    //if passwords don't match return error
                    return done(null, false, { message: "Wrong password!" })
                }
            })
        })
        .catch(err => {
            return done(null, false, { message: err })
        })
    }
))

/*-------------------- SERIALISE AND DESERIALISE USERS ------------------------- */

passport.serializeUser((user, cb) => {
    return cb(null, user._id)
})

passport.deserializeUser(async(id, cb) => {
    try {
        const user = await User.findById(id);
        //omitting password otherwise we will make a big OOPSIE
        const { password, ...userInfo } = user._doc
        cb(null, userInfo)
    } catch(err) {
        cb(err)
    }
})
