import { JwtPayload } from "jsonwebtoken";
import { ObjectId } from "mongoose";

export interface IJwtPayload extends JwtPayload{
  _id: ObjectId;
}

export type IPublicUser = {
  fullname?: string;
  gender?: "man" | "women" | "none";
  phoneNumber?: string;
  password?: string;
  email?: string;
  status?: string;
}

export const notUpdatedUserDoc = [
  "email", "status", "password"
];

export interface IRegisteredInvitation {
  web_url: string;
  groom_fullname: string;
  bride_fullname: string;
  template: string;
  user?: string;
}

export interface IinvitationImg {
  field: string;
  content: string;
}

export const PictureInvitationKey = ["bride", "groom"];