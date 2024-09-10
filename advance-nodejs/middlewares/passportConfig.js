const passport = require("passport");
const LocalStrategy = require("passport-local");
const GitHubStrategy = require("passport-github").Strategy;
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

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/github/callback",
    },
    function (accessToken, refreshToken, profile, done) {      
      User.findOne({ githubId: profile.id })
        .then((user) => {
          if (!user) {
            User.create({
              githubId: profile.id,
              email: profile.displayName,
              username: profile.username,
              password: profile.id,
            }).then(user =>  done(null, user));
          }
          return done(null, user);
        })
        .catch((err) => done(err, false));
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
