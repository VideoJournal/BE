import express from 'express';
import { json, urlencoded } from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import config from './config';
import { connect } from './utils/db';
import { signin, signup, protect } from './utils/auth';
import userRouter from './resources/user/user.router';
import videoRouter from './resources/video/video.router';
import commentRouter from './resources/comment/comment.router';

export const app = express();

app.disable('x-powered-by');


app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan('dev'));

app.post('/signup', signup);
app.post('/signin', signin);

app.use('/api', protect);
app.use('/api/user', userRouter);
app.use('/api/video', videoRouter);
app.use('/api/comment', commentRouter);

export const start = async () => {
  try {
    await connect();
    app.listen(config.port, () => {
      console.log('\x1b[35m%s\x1b[0m',
        `Magic happening on http://localhost:${config.port}`);
    });
  } catch (e) {
    console.error(e);
  }
};
