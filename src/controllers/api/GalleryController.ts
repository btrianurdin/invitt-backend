import { Request, Response } from "express";
import { ObjectId } from "mongoose";
import Config from "../../config";
import Gallery from "../../models/Gallery";
import Invitation from "../../models/Invitation";
import { ErrorResponse } from "../../utils/ErrorResponse";
import { imageRemove, imageUpload } from "../../utils/imgUploader";
import { checkValidation } from "../../utils/validation";

export default class GalleryController {
  static async create(req: Request, res: Response) {
    try {
      const { content } = req.body;

      if (checkValidation(req)) return ErrorResponse.BAD_REQUEST(res, checkValidation(req));

      const session = res.locals.users;

      const checkGallery = await Gallery.findOne({invitation: session["invitation"]}).countDocuments();

      if (checkGallery >= Config.maxGallery) {
        return ErrorResponse.BAD_REQUEST(res, `maximum gallery is ${Config.maxGallery} images`)
      }

      try {
        const { public_id, secure_url } = await imageUpload(content);

        const gallery = new Gallery({
          public_name: public_id, 
          url: secure_url, 
          invitation: session["invitation"]
        });
        await gallery.save();

        res.status(200).json({
          status: "succes",
          data: gallery
        })

      } catch(err: any) {
        throw new Error(err?.message)
      }
    } catch(err: any) {
      ErrorResponse.INTERNAL_SERVER_ERROR(res, err?.message);
    }
  }

  static async all(req: Request, res: Response) {
    try {
      const session = res.locals.users;

      const gallery = await Gallery.find({invitation: session["invitation"]});

      res.status(200).json({
        status: "success",
        data: gallery
      })
    } catch(err: any) {
      ErrorResponse.INTERNAL_SERVER_ERROR(res, err?.message);
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!id) return ErrorResponse.BAD_REQUEST(res, "id is empty");

      const session = res.locals.users;
      
      const gallery = await Gallery.findOne({_id: id, invitation: session["invitation"]});
      if (!gallery) return ErrorResponse.BAD_REQUEST(res, "id not found");

      try {
        await Gallery.findOneAndDelete({_id: id});
        await imageRemove((gallery as any)["public_name"]);

        res.status(200).json({
          status: "success",
          data: {}
        })
        
      } catch (err) {
        throw new Error("failed to delete")
      }
    } catch(err: any) {
      ErrorResponse.INTERNAL_SERVER_ERROR(res, err?.message);
    }
  }
}