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
  const strategyOptions = {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${process.env.SERVER_API_URL}/auth/google/callback`,
  };

  const verifyCallback = async (accessToken, refreshToken, profile, done) => {
    const [err, user] = await to(getUserByGoogleID(profile.id));

    if (err || user) {
      return done(err, user);
    }

    const verifiedEmail =
      profile.emails.find(email => email.verified) || profile.emails[0];

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

  passport.use(new GoogleStrategy(strategyOptions, verifyCallback));

  app.get(
    `${process.env.BASE_API_URL}/auth/google`,
    passport.authenticate('google', {
      scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email',
      ],
    }),
  );

  app.get(
    `${process.env.BASE_API_URL}/auth/google/callback`,
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
      const token = newToken(req.user);

      const htmlWithEmbeddedJWT = `
        <html>
        <script>
            // Save JWT to localStorage
            window.localStorage.setItem('JWT', '${token}');
            // Redirect browser to root of application
            window.location.href = '/';
        </script>
        </html>
    `;

      res.send(htmlWithEmbeddedJWT);
    },
  );

  return app;
};

export { strategy };
