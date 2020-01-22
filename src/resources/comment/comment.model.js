import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
      required: true,
      trim: true,
      maxlength: 140
    },
    createdBy: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'user',
      required: true
    },
    video: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'video',
      required: true
    }
  },
  { timestamps: true }
);

commentSchema.index({ video: 1, comment: 1 }, { unique: true });

export const Comment = mongoose.model('comment', commentSchema);
