import express from 'express';
import { json, urlencoded } from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import config from './config';
import { connect } from './utils/db';

export const app = express();
app.disable('x-powered-by');

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan('dev'));

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