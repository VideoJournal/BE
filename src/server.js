import express from 'express';
import { json, urlencoded } from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';

import config from './config';
import { connect } from './utils/db';
import {
  signin, signup, protect, socialAuthLogin
} from './utils/auth';
import userRouter from './resources/user/user.router';
import videoRouter from './resources/video/video.router';
import commentRouter from './resources/comment/comment.router';

const passport = require('passport');
const authStrategies = require('../src/utils/middleware/authStrategies');

export const app = express();

app.disable('x-powered-by');

app.use(passport.initialize());
passport.use(authStrategies.googleStrategy());
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan('dev'));

app.get('/', (_, res) =>
  res
    .status(200)
    .json({ status: 200, message: 'Welcome, the video journal app awaits!' }),
);
app.post('/signup', signup);
app.post('/signin', signin);
// Google Sign In

app.get('signin/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

app.get(
  'signin/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  socialAuthLogin
);
app.use('/api', protect);
app.use('/api/user', userRouter);
app.use('/api/video', videoRouter);
app.use('/api/comment', commentRouter);

export const start = async () => {
  try {
    await connect();
    app.listen(config.port, () => {
      console.log(
        '\x1b[35m%s\x1b[0m',
        `Magic happening on http://localhost:${config.port}`,
      );
    });
  } catch (e) {
    console.error(e);
  }
};
