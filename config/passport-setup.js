const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LocationStrategy = require('passport-local').Strategy;

const User = require('../models/user');
/*serialize and deserialize functions to cater

cookie token generation
*/
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});
/*
local authentication strategy using passport js

passport configuration done below
*/
//signup connfiguration
// passport.get(
//   'signup',
//   new LocationStrategy({
//     usernameField: 'email',
//     passwordFile: 'password',
//   })
// );

/*
google authentication using OAuth2.0

passport configuration is done below
*/

passport.use(
  'google',
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/api/auth/google/redirect',
    },
    async (accessToken, refreshToken, profile, done) => {
      User.findOne({ email: profile.emails[0].value }).then((user) => {
        if (user) {
          done(null, user);
        } else {
          new User({
            firstName: profile.displayName,
            email: profile.emails[0].value,
            googleId: profile.id,
          })
            .save()
            .then((newUser) => {
              console.log('new user: ' + newUser);
              done(null, newUser);
            });
        }
      });
    }
  )
);
