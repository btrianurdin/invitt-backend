import { Request, Response } from "express";
import { ErrorResponse } from "../../utils/ErrorResponse";
import Invitation, { IInvitationModel } from "../../models/Invitation";
import imgUploader from "../../utils/imgUploader";
import { IRegisteredInvitation } from "../../interfaces";
import { checkValidation } from "../../utils/validation";
import { ObjectId } from "mongoose";
import User from "../../models/User";

export default class InvitationController {
  static async completedRegistration(req: Request, res: Response) {
    try {
      const invitationBody = req.body as IRegisteredInvitation;

      if (checkValidation(req)) {
        ErrorResponse.BAD_REQUEST(res, checkValidation(req));
        return;
      }

      if (res.locals.users["status"] === "complete") {
        return ErrorResponse.BAD_REQUEST(res, "registration status is completed");
      }

      const sessionId: ObjectId = res.locals.users["_id"];
      
      delete invitationBody["user"];
      
      const invitation = await Invitation.findOneAndUpdate({user: sessionId}, invitationBody, {new: true});
      
      if (invitation) {
        await User.findByIdAndUpdate(sessionId, {status: "complete"});
      }

      res.status(200).json({
        message: "success",
        data: invitation
      })
      
    } catch (err: any) {
      ErrorResponse.INTERNAL_SERVER_ERROR(res, err?.message);
    }
  }

  static async show(req: Request, res: Response) {
    try{
      if (res.locals.users["status"] === "incomplete") {
        return ErrorResponse.ACCESS_DENIED(res, "user status is not complete yet")
      }

      const sessionId: ObjectId = res.locals.users["_id"];

      const invitation = await Invitation.findOne({user: sessionId});

      res.status(200).json({
        status: "success",
        data: invitation,
      });
    } catch(err) {
      ErrorResponse.INTERNAL_SERVER_ERROR;
    }
  }

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