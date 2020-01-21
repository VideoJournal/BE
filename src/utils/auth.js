import jwt from 'jsonwebtoken';
import config from '../config';
import { User } from '../resources/user/user.model';

export const newToken = (user) => jwt.sign({ id: user.id }, config.secrets.jwt, {
  expiresIn: config.secrets.jwtExp
});
