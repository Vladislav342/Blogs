import mongoose, { Document, Schema } from 'mongoose';

export interface IBlog extends Document {
  title: string;
  date: string;
  content: string;
}

const blogSchema: Schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  content: {
    type: String,
  },
});

const Blog =
  mongoose.models.Blogs || mongoose.model<IBlog>('Blogs', blogSchema);

export default Blog;
