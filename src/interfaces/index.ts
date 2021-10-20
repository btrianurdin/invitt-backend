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
}

export interface IinvitationImg {
  field: string;
  content: string;
}

export interface IWeddingDateUpdate {
  id: Schema.Types.ObjectId;
  invitation?: Schema.Types.ObjectId;
  place_name?: string;
  date?: Date;
  location?: String;
  longitude?: String;
  latitude?: String;
  map_link?: String;
}

export interface IGuestBookCreate {
  invitation?: Schema.Types.ObjectId;
  guest_name: string;
  attendance: "Y" | "N";
  message: string;
}

export const InvitationBlockUpdate = [
  "groom_pic", "bride_pic", "active_at", "expired_at"
]

export const PictureInvitationKey = ["bride", "groom"];