import { User } from './user.model';
import { Video } from '../video/video.model';

export const me = async (req, res) => {
  const data = req.user;

  try {
    const videos = await Video.find({ createdBy: data._id })
      .lean()
      .exec();

    data.videos = videos;

    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ error: `Could not get user's videos: ${error}` });
  }
};

export const updateMe = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.user_id, req.body, {
      new: true,
    })
      .lean()
      .exec();
    res.status(200).json({ data: user });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'could not update user' });
  }
};
