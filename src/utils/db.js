import mongoose from 'mongoose';
import options from '../config';

export const connect = (url = options.dbUrl, opts = {}) =>
  mongoose.connect(url, {
    ...opts,
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
