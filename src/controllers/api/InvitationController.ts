import { Request, Response } from "express";
import { ErrorResponse } from "../../utils/ErrorResponse";
import Invitation, { IInvitationModel, IUserPic } from "../../models/Invitation";
import {imageRemove, imageUpload} from "../../utils/imgUploader";
import { IinvitationImg, IRegisteredInvitation, PictureInvitationKey } from "../../interfaces";
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
    // try{
    //   const invitation = req.body as IInvitationModel;

    //   const testupload = await imgUploader(invitation.groom_pic);

    //   res.status(200).json({
    //     status: "success",
    //     message: testupload,
    //   });
    // } catch(err) {
    //   ErrorResponse.INTERNAL_SERVER_ERROR;
    // }
  }

  static async images(req: Request, res: Response) {
    try{
      const { content, field } = req.body as IinvitationImg;

      if (checkValidation(req)) {
        ErrorResponse.BAD_REQUEST(res, checkValidation(req));
        return;
      }

      const sessionId: ObjectId = res.locals.users["_id"];
      const invitation = await Invitation.findOne({ user: sessionId }).select("_id groom_pic bride_pic");

      const inv_pic = (invitation as any)![`${field}_pic`];
      
      if (JSON.stringify(inv_pic) !== "{}") {
        return ErrorResponse.BAD_REQUEST(res, `${field} picture has been added`);
      }

      try {
        const { public_id, secure_url } = await imageUpload(content);
        const invPicSave: IUserPic = {
          public_name: public_id,
          url: secure_url,
        }
        const invSave = await Invitation.findOneAndUpdate(
          {user: sessionId}, 
          {[`${field}_pic`]: invPicSave}, 
          {new: true}
        )
          .select(`_id ${field}_pic`);
        
        res.status(200).json({
          status: "success",
          data: invSave,
        });
      } catch (err: any) {
        throw new Error("upload failed");
      }
    } catch(err: any) {
      ErrorResponse.INTERNAL_SERVER_ERROR(res, err?.message);
    }
  }

  static async imagesDelete(req: Request, res: Response) {
    try{
      const { field } = req.body as IinvitationImg;

      if (!PictureInvitationKey.includes(field)) {
        return ErrorResponse.BAD_REQUEST(res, "field is not valid");
      }

      const sessionId: ObjectId = res.locals.users["_id"];

      const invitationData = await Invitation.findOne({user: sessionId})
        .select(`${field}_pic`);

      if (JSON.stringify((invitationData as any)![`${field}_pic`]) === "{}") {
        return ErrorResponse.BAD_REQUEST(res, "data not found");
      }

      try{
        const remove = await imageRemove((invitationData as any)![`${field}_pic`]['public_name']);
        await Invitation.findOneAndUpdate({user: sessionId}, 
          {
            $unset: {
              [`${field}_pic`]: ""
            }
          }
        )
  
        res.status(200).json({
          status: "success",
          data: {},
        });

      } catch(err: any) {
        throw new Error(err?.message);
      }

    } catch(err: any) {
      ErrorResponse.INTERNAL_SERVER_ERROR(res, err?.message);
    }
  }
}