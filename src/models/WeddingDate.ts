import { Document, model, Schema } from "mongoose";

export interface IWeddingDateModel extends Document {
  invitation: Schema.Types.ObjectId;
  place_name: string;
  date: Date;
  title: String;
  location: String;
  longitude: String;
  latitude: String;
  map_link: String;
}

const WeddingDateSchema = new Schema(
  {
    invitation: {
      type: Schema.Types.ObjectId,
      ref: "Invitation",
    },
    place_name: String,
    date: Date,
    title: String,
    location: String,
    longitude: String,
    latitude: String,
    map_link: String,
  },
  { timestamps: true }
);

export default model<IWeddingDateModel>("WeddingDate", WeddingDateSchema);
