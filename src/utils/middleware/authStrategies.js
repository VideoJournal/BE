import { User } from '../../resources/user/user.model';
const cryptoRandomString = require('crypto-random-string');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const passport = require('passport');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

async function callbackStrategy(profile, cb) {
  const email = profile.emails[0].value;
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      const newUser = {
        name: profile.name,
        email,
        userName: profile.username,
        password: cryptoRandomString({ length: 12, type: 'base64' })
      };
      const user = await User.create(newUser);
      if (!user) {
        return new Error();
      }
      return cb(null, user);
    }
    return cb(null, existingUser);
  } catch (error) {
    return cb(error, null);
  }
}

function googleStrategy() {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: 'auth/google/redirect'
      },
      (accessToken, refreshToken, profile, cb) => callbackStrategy(profile, cb)
    )
  );
}

module.exports = {
  googleStrategy
};
