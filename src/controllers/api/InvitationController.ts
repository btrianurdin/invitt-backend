import { Request, Response } from "express";
import { ErrorResponse } from "../../utils/ErrorResponse";
import Invitation, { IInvitationModel, IUserPic } from "../../models/Invitation";
import {imageRemove, imageUpload} from "../../utils/imgUploader";
import { 
  IinvitationImg, 
  InvitationBlockUpdate, 
  IRegisteredInvitation, 
  PictureInvitationKey 
} from "../../interfaces";
import { checkValidation } from "../../utils/validation";
import { ObjectId } from "mongoose";
import User from "../../models/User";
import { dateNow, nextDayTime } from "../../utils/DateTime";
import Config from "../../config";

export default class InvitationController {
  static async show(req: Request, res: Response) {
    try{
      const session = res.locals.users;

      const invitation = await Invitation.findById(session["invitation"]);

      res.status(200).json({
        status: "success",
        data: invitation,
      });
    } catch(err: any) {
      ErrorResponse.INTERNAL_SERVER_ERROR(res, err?.message);
    }
  }

  // static async status(req: Request, res: Response) {
  //   try{
  //     if (res.locals.users["status"] === "incomplete") {
  //       return ErrorResponse.ACCESS_DENIED(res, "user status is not complete yet")
  //     }
      
  //     const sessionId: ObjectId = res.locals.users["_id"];

  //     const invData = await Invitation.findOne({user: sessionId}).select("status");

  //     if (invData?.status !== "nonactive") return ErrorResponse.BAD_REQUEST(res, "status can't be changed")

  //     const invitation = await Invitation.findOneAndUpdate({user: sessionId}, 
  //       {
  //         status: "active",
  //         active_at: dateNow(),
  //         expired_at: nextDayTime(Config.invitationExpiredTime)
  //       },
  //       {new: true}
  //     ).select("status active_at expired_at")

  //     res.status(200).json({
  //       status: "success",
  //       data: invitation,
  //     });
  //   } catch(err: any) {
  //     ErrorResponse.INTERNAL_SERVER_ERROR(res, err?.message);
  //   }
  // }

  static async update(req: Request, res: Response) {
    try{
      if (checkValidation(req)) return ErrorResponse.BAD_REQUEST(res, checkValidation(req));

      const updateData = req.body;

      InvitationBlockUpdate.forEach(key => {
        delete updateData![key];
      })

      const session = res.locals.users;

      const invitation = await Invitation.findByIdAndUpdate(session["invitation"], updateData, {new: true});

      res.status(200).json({
        status: "success",
        data: invitation,
      });
    } catch(err: any) {
      ErrorResponse.INTERNAL_SERVER_ERROR(res, err?.message);
    }
  }

  static async images(req: Request, res: Response) {
    try{
      const { content, field } = req.body as IinvitationImg;

      if (checkValidation(req)) return ErrorResponse.BAD_REQUEST(res, checkValidation(req));

      const session = res.locals.users;
      const invitation = await Invitation.findById(session["invitation"]).select(
        "_id groom_pic bride_pic"
      );

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
        const invSave = await Invitation.findByIdAndUpdate(
          session["invitation"], 
          {
            [`${field}_pic`]: invPicSave
          }, 
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

      if (checkValidation(req)) return ErrorResponse.BAD_REQUEST(res, checkValidation(req));

      const session = res.locals.users;

      const invitationData = await Invitation.findById(session["invitation"])
        .select(`${field}_pic`);

      if (JSON.stringify((invitationData as any)![`${field}_pic`]) === "{}") {
        return ErrorResponse.BAD_REQUEST(res, "data not found");
      }

      try{
        await imageRemove((invitationData as any)![`${field}_pic`]['public_name']);
        await Invitation.findByIdAndUpdate(session["invitation"], 
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