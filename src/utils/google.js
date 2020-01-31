import passport from 'passport';
import passportGoogle from 'passport-google-oauth';

const GoogleStrategy = passportGoogle.OAuth2Strategy;

const strategy = app => {
  const strategyOptions = {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${process.env.SERVER_API_URL}/auth/google/callback`,
  };

  const verifyCallback = async (accessToken, refreshToken, profile, done) => {
    // TODO
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
      return res
        .status(200)
        .cookie('jwt', signToken(req.user), {
          httpOnly: true,
        })
        .redirect('/');
    },
  );

  return app;
};

export { strategy };
