import { Document, model, Schema } from "mongoose";

export interface IGalleryModel extends Document {
  invitation: Schema.Types.ObjectId;
  public_name: string;
  url: string;
}

const GallerySchema = new Schema(
  {
    invitation: {
      type: Schema.Types.ObjectId,
      ref: "Invitation",
    },
    public_name: String,
    url: String,
  },
  { timestamps: true }
);

export default model<IGalleryModel>("Gallery", GallerySchema);
