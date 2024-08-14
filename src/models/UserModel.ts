import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  _id: string;
  login: string;
  password: string;
}

const UserSchema = new Schema({
  login: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

const UserBlog: mongoose.Model<IUser> =
  mongoose.models.usersBlog || mongoose.model<IUser>('usersBlog', UserSchema);

export default UserBlog;
