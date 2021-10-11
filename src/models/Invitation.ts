import { Document, model, Schema } from "mongoose";

export interface IUserPic {
  public_name: string;
  url: string;
}

export interface IInvitationModel extends Document {
  user: Schema.Types.ObjectId;
  web_url: string;
  hero_title: string;
  groom_shortname: string;
  bride_shortname: string;
  groom_fullname: string;
  bride_fullname: string;
  introduce_title: string;
  groom_pic: IUserPic;
  bride_pic: IUserPic;
  groom_text: string;
  bride_text: string;
  greeting: string;
  template: string;
  status: "nonactive" | "active" | "expired";
  active_at: Date;
  expired_at: Date;
}

const InvitationSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    web_url: String,
    hero_title: String,
    groom_shortname: String,
    bride_shortname: String,
    groom_fullname: String,
    bride_fullname: String,
    introduce_title: String,
    groom_pic: {
      public_name: String,
      url: String,
    },
    bride_pic: {
      public_name: String,
      url: String,
    },
    groom_text: String,
    bride_text: String,
    greeting: String,
    template: String,
    status: {
      type: String,
      enum: ["active", "nonactive", "expired"],
      default: "nonactive",
    },
    active_at: Date,
    expired_at: Date,
  },
  { timestamps: true }
);

export default model<IInvitationModel>("Invitation", InvitationSchema);
