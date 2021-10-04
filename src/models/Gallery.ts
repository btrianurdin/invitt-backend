import { Document, model, Schema } from "mongoose";

export interface IGalleryModel extends Document {
  invitation: Schema.Types.ObjectId;
  img_url: string;
  filename: string;
}

const GallerySchema = new Schema(
  {
    invitation: {
      type: Schema.Types.ObjectId,
      ref: "Invitation",
    },
    img_url: String,
    filename: String,
    guest_name: String,
  },
  { timestamps: true }
);

export default model<IGalleryModel>("Gallery", GallerySchema);
