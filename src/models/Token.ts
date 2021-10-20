import { Document, model, Schema } from "mongoose";

export interface ITokenModel extends Document {
  token: string;
  expired: number;
  user: Schema.Types.ObjectId;
}

const TokenSchema: Schema<ITokenModel> = new Schema({
  token: String,
  expired: Number,
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
}, {timestamps: true});

export default model<ITokenModel>("Token", TokenSchema);