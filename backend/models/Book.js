import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    description: { type: String },
    genre: { type: String },
    coverImage: { type: String }, // URL to image
    averageRating: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model('Book', bookSchema);
