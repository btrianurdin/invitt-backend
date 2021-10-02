import { Document, model, Schema } from "mongoose";

export interface IGuestbookModel extends Document {
  invitation: Schema.Types.ObjectId;
  guest_name: string;
  attendance: "Y" | "N";
  message: string;
}

const GuestbookSchema = new Schema(
  {
    invitation: {
      type: Schema.Types.ObjectId,
      ref: "Invitation",
    },
    guest_name: String,
    attendance: {
      type: String,
      enum: ["Y", "N"],
      default: "Y",
    },
    message: String,
  },
  { timestamps: true }
);

export default model<IGuestbookModel>("Guestbook", GuestbookSchema);
