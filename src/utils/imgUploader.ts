import Cloudinary from "../services/Cloudinary";
import Random from "./Random";

export const imageUpload = async (_base64: string) => {
  try {
    const result = await Cloudinary.uploader.upload(_base64, {
      unique_filename: false,
      use_filename: true,
      folder: 'invitt_assets',
      public_id: Random.filename(),
    });
  
    return result;
  } catch (err: any) {
    throw new Error("Upload image is failed");
  }
}

export const imageRemove = async (_name: string) => {
  try {
    const result = await Cloudinary.uploader.destroy(_name);
  } catch (err: any) {
    throw new Error("remove image is failed");
  }
}