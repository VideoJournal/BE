import passport from 'passport';
import passportGoogle from 'passport-google-oauth';
import { to } from 'await-to-js';

import {
  getUserByGoogleID,
  createUser,
} from '../resources/user/user.controllers';
import { newToken } from './auth';

const GoogleStrategy = passportGoogle.OAuth2Strategy;

const strategy = app => {
  // strategyOptions is options for the google strategy
  const strategyOptions = {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${process.env.SERVER_API_URL}/auth/google/callback`,
  };

  /**
   * verifyCallback is used by the google strategy
   * to perform action on the returned scope
   */
  const verifyCallback = async (accessToken, refreshToken, profile, done) => {
    // get user if it exists
    const [err, user] = await to(getUserByGoogleID(profile.id));

    if (err || user) {
      return done(err, user);
    }

    // gets a verified mail or the first mail otherwise
    const verifiedEmail =
      profile.emails.find(email => email.verified) || profile.emails[0];

    // create user if it does not exist
    const [createdError, createdUser] = await to(
      createUser({
        name: `${profile.name.givenName} ${profile.name.familyName}`,
        userName: profile.displayName,
        email: verifiedEmail.value,
        password: null,
        googleID: profile.id,
      }),
    );

    return done(createdError, createdUser);
  };

  // initialize passport and use the google strategy
  app.use(passport.initialize());
  passport.use(new GoogleStrategy(strategyOptions, verifyCallback));

  // the serializer function
  passport.serializeUser(function (user, done) {
    done(null, user);
  });

  // the deserializer function
  passport.deserializeUser(function (user, done) {
    done(null, user);
  });

  // route to call google authentication
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email',
      ],
    }),
  );

  // callback route called by google after authentication
  app.get(
    '/auth/google/callback',
    passport.authenticate('google', {
      failureRedirect: `${process.env.CLIENT_REDIRECT_URL}/signup`,
    }),
    (req, res) => {
      const token = newToken(req.user);

      res.redirect(`${process.env.CLIENT_REDIRECT_URL}/dash?token=${token}`);
    },
  );
};

export { strategy };
