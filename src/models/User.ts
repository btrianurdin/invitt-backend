import { Document, model, Schema } from "mongoose";
import { hashSync } from "bcrypt";

export interface IUserModel extends Document {
  fullname: string;
  email: string;
  password: string;
  phoneNumber: string; 
  gender: "man" | "women" | "none";
  status: "incomplete" | "complete";
}

const UserSchema: Schema<IUserModel> = new Schema({
  fullname: String,
  email: {
    type: String,
    require: [true, "Email can't be empty"]
  },
  password: {
    type: String,
    require: [true, "Password can't be empty"]
  },
  phoneNumber: String,
  gender: {
    type: String,
    enum: ["man", "women", "none"],
    default: "none"
  },
  status: {
    type: String,
    enum: ["incomplete", "complete"],
    default: "incomplete"
  }
}, {timestamps: true});

UserSchema.pre<IUserModel>("save", function (next) {
  this.password = hashSync(this.password, 10);
  next();
});

export default model<IUserModel>("User", UserSchema);