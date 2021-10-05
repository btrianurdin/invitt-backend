import { JwtPayload } from "jsonwebtoken";
import { ObjectId } from "mongoose";

export interface IJwtPayload extends JwtPayload{
  _id: ObjectId;
}

export interface IUser {
  fullname?: string;
  gender?: "man" | "women" | "none";
  phoneNumber?: string;
}