import { JwtPayload } from "jsonwebtoken";
import { ObjectId, Schema } from "mongoose";
import { IUserPic } from "../models/Invitation";

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

export const InvitationBlockUpdate = [
  "user", "groom_pic", "bride_pic", "status", "active_at", "expired_at"
]

export const PictureInvitationKey = ["bride", "groom"];