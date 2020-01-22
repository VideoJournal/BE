import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema(
  {
    videos: [{
      type: String
    }],
    description: String,
    createdBy: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'user',
      required: true
    }
  }
);

videoSchema.index({ user: 1, videos: 1 });

export const Video = mongoose.model('video', videoSchema);
