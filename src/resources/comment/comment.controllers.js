import { crudControllers } from '../../utils/crud';
import { Comment } from './comment.model';

const controllers = crudControllers(Comment);

const getByVideoID = async (req, res) => {
  const { id } = req.params;

  try {
    const comments = await Comment.find({ video: id })
      .lean()
      .exec();

    res.status(200).json({ data: comments });
  } catch (error) {
    res.status(500).json({ error: `Could not get video's comments: ${error}` });
  }
};

export default controllers;
