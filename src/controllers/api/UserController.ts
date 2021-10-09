import { Request, Response } from "express";
import { ObjectId } from "mongoose";
import { IPublicUser, notUpdatedUserDoc } from "../../interfaces";
import User from "../../models/User";
import { ErrorResponse } from "../../utils/ErrorResponse";
import { checkValidation } from "../../utils/validation";

export default class UserController {
  static async show(req: Request, res: Response) {
    try {
      const sessionId: ObjectId = res.locals.users["_id"];
      const user = await User.findById(sessionId).select(
        "_id fullname email phoneNumber gender status"
      );

      res.status(200).json({
        message: "success",
        data: user
      })
    } catch(err: any) {
      ErrorResponse.INTERNAL_SERVER_ERROR(res, err?.message);
    }
  }

  static async edit(req: Request, res: Response) {
    try {
      let userBody = req.body as IPublicUser;

      if (checkValidation(req)) {
        ErrorResponse.BAD_REQUEST(res, checkValidation(req));
        return;
      }

      for (const key in userBody) {
        console.log(key);
      }
      
      const sessionId: ObjectId = res.locals.users["_id"];

      const userUpdate = await User.findByIdAndUpdate(sessionId, userBody,
        {new: true}
      ).select(
        "_id fullname email phoneNumber gender status"
      );
      if (!userUpdate) throw new Error("failed update user");

      res.status(200).json({
        message: "success",
        data: userUpdate
      })
    } catch(err: any) {
      ErrorResponse.INTERNAL_SERVER_ERROR(res, err?.message);
    }
  }

  static async editPassword(req: Request, res: Response) {
    try {
      const { password } = req.body as {password: string};

      const sessionId: ObjectId = res.locals.users["_id"];

      const user = await User.findById(sessionId);
      Object.assign(user, {
        password
      });
      await user?.save();

      res.status(200).json({
        message: "success",
        data: {}
      })
    } catch (err: any) {
      ErrorResponse.INTERNAL_SERVER_ERROR(res, err?.message);
    }
  }
}