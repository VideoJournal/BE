import { User } from './user.model';

export const me = (req, res) => {
  res.status(200).json({ data: req.user });
};

export const updateMe = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.user_id, req.body, {
      new: true
    })
      .lean()
      .exec();
    res.status(200).json({ data: user });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'could not update user' });
  }
};
