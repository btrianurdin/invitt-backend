import { Document, model, Schema } from "mongoose";
import { hashSync } from "bcrypt";

export interface ITokenModel extends Document {
  token: string;
  user: Schema.Types.ObjectId;
}

const TokenSchema: Schema<ITokenModel> = new Schema({
  token: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
}, {timestamps: true});

export default model<ITokenModel>("User", TokenSchema);