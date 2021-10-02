import { Request, Response } from "express";
import { ErrorResponse } from "../../utils/ErrorResponse";
import Invitation, { IInvitationModel } from "../../models/Invitation";
import Cloudinary from "../../services/Cloudinary";
import Random from "../../utils/Random";

export default class InvitationController {
  static async create(req: Request, res: Response) {
    try{
      const invitation: IInvitationModel = req.body;

      const imgUpload = await Cloudinary.uploader.upload(invitation.groom_pic, {
        unique_filename: false,
        use_filename: true,
        folder: 'invitt_assets',
        public_id: Random.filename(),
      });

      

      res.status(200).json({
        status: "success",
        message: imgUpload,
      });
    } catch(err) {
      ErrorResponse.INTERNAL_SERVER_ERROR;
    }
  }
}