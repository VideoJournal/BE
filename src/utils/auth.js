import jwt from 'jsonwebtoken';
import config from '../config';
import { User } from '../resources/user/user.model';

export const newToken = (user) =>
  jwt.sign({ id: user.id }, config.secrets.jwt, {
    expiresIn: config.secrets.jwtExp
  });

export const verifyToken = (token) =>
  new Promise((resolve, reject) => {
    jwt.verify(token, config.secrets.jwt, (err, payload) => {
      if (err) return reject(err);
      resolve(payload);
    });
  });

export const signup = async (req, res) => {
  if (
    !req.body.name
    || !req.body.userName
    || !req.body.email
    || !req.body.password
  ) {
    return res.status(400).json({ error: 'missing required field' });
  }

  try {
    const user = await User.create(req.body);
    const token = newToken(user);
    // console.log(token);
    return res.status(201).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'could not signup user' });
  }
};

export const signin = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res
      .status(400)
      .json({ error: 'need email and password to register' });
  }

  const invalid = { error: 'invalid email and password combination' };

  try {
    const user = await User.findOne({ email: req.body.email })
      .select('email password')
      .exec();

    if (!user) {
      return res.status(401).json(invalid);
    }

    const match = await user.checkPassword(req.body.password);

    if (!match) {
      return res.status(401).json(invalid);
    }

    const token = newToken(user);
    return res.status(201).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'could not signin' });
  }
};

export const socialAuthLogin = async (req, res) => {
  const { user } = req;

  try {
    const token = newToken(user.dataValues);
    return res.status(201).json({
      message: `${user.dataValues.email} successfully logged in.`,
      token
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const protect = async (req, res, next) => {
  const bearer = req.headers.authorization;

  if (!bearer || !bearer.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'user is unauthenticated' });
  }

  const token = bearer.split('Bearer ')[1].trim();
  let payload;
  try {
    payload = await verifyToken(token);
  } catch (error) {
    console.error(error);
    return res.status(401).json({ error: 'unauthorized user, access denied' });
  }

  const user = await User.findById(payload.id)
    .select('-password')
    .lean()
    .exec();

  if (!user) {
    return res.status(401).json({ error: 'unauthorized user, access denied' });
  }

  req.user = user;
  next();
};
