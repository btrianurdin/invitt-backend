import { Request, Response } from "express";
import { ErrorResponse } from "../../utils/ErrorResponse";
import Invitation, { IInvitationModel } from "../../models/Invitation";
import imgUploader from "../../utils/imgUploader";

export default class InvitationController {
  static async create(req: Request, res: Response) {
    try{
      const invitation = req.body as IInvitationModel;

      const testupload = await imgUploader(invitation.groom_pic);

      res.status(200).json({
        status: "success",
        message: testupload,
      });
    } catch(err) {
      ErrorResponse.INTERNAL_SERVER_ERROR;
    }
  }
}