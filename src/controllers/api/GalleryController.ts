import { Request, Response } from "express";
import { ObjectId } from "mongoose";
import Gallery from "../../models/Gallery";
import Invitation from "../../models/Invitation";
import { ErrorResponse } from "../../utils/ErrorResponse";
import { imageRemove, imageUpload } from "../../utils/imgUploader";
import { checkValidation } from "../../utils/validation";

export default class GalleryController {
  static async create(req: Request, res: Response) {
    try {
      const { content } = req.body;

      if (checkValidation(req)) {
        ErrorResponse.BAD_REQUEST(res, checkValidation(req));
        return;
      }

      const sessionId = res.locals.users["_id"];
      const invitation = await Invitation.findOne({user: sessionId}).select("_id");

      const checkGallery = await Gallery.findOne({invitation: invitation!["_id"]}).countDocuments();

      if (checkGallery >= 6) return ErrorResponse.BAD_REQUEST(res, "maximum gallery is 6 images");

      try {
        const { public_id, secure_url } = await imageUpload(content);

        const gallery = new Gallery({
          public_name: public_id, 
          url: secure_url, 
          invitation: invitation!["_id"]
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
      const sessionId = res.locals.users["_id"];
      const invitation = await Invitation.findOne({user: sessionId}).select("_id");

      const gallery = await Gallery.find({invitation: invitation!["_id"]});

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
      const { id } = req.body as {id: ObjectId};

      if (!id) return ErrorResponse.BAD_REQUEST(res, "id is empty");

      const sessionId = res.locals.users["_id"];
      const invitation = await Invitation.findOne({user: sessionId}).select("_id");
      
      const gallery = await Gallery.findOne({_id: id, invitation: invitation!["_id"]});
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