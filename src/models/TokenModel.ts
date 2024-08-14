import mongoose, { Document, Schema } from 'mongoose';

export interface IToken extends Document {
  user: string;
  refreshToken: string;
}

const TokenSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'usersBlog' },
  refreshToken: { type: String, required: true },
});

const TokenBlog: mongoose.Model<IToken> =
  mongoose.models.tokensBlog ||
  mongoose.model<IToken>('tokensBlog', TokenSchema);

export default TokenBlog;
