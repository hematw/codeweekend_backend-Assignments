const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("../models/User");

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    (username, password, done) => {
      User.findOne({ email: username })
        .then((user) => {
          if (!user) return done(null, false);
          user
            .comparePassword(password)
            .then((isMatch) => {
              if (!isMatch) return done(null, false);
              return done(null, user);
            })
            .catch((err) => done(err));
        })
        .catch((err) => done(err));
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then((user) => done(null, user))
    .catch((err) => done(err, null));
});

module.exports = passport;
