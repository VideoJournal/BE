export const getOne = (model) => async (req, res) => {
  try {
    const doc = await model
      .findOne({ createdBy: req.user._id, _id: req.params.id })
      .lean()
      .exec();

    if (!doc) {
      return res.status(404).end();
    }
    res.status(200).json({ data: doc });
  } catch (error) {
    console.error(error);
    res.status(400).end();
  }
};

