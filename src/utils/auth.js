import jwt from 'jsonwebtoken';
import config from '../config';
import { User } from '../resources/user/user.model';

export const newToken = (user) => jwt.sign({ id: user.id }, config.secrets.jwt, {
  expiresIn: config.secrets.jwtExp
});

export const verifyToken = (token) => {
  new Promise((resolve, reject) => {
    jwt.verify(token, config.secrets.jwt, (err, payload) => {
      if (err) return reject(err);
      resolve(payload);
    });
  });
};

export const signup = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({ error: 'need email and password to signup' });
  }


  try {
    const user = await User.create(req.body);
    const token = newToken(user);
    return res.status(201).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'could not signup user' });
  }
};
