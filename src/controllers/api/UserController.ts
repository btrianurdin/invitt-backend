import { Request, Response } from "express";
import { ObjectId } from "mongoose";
import { IUser } from "../../interfaces";
import User from "../../models/User";
import { ErrorResponse } from "../../utils/ErrorResponse";
import { checkValidation } from "../../utils/validation";

export default class UserController {
  static async show(req: Request, res: Response) {
    try {
      res.status(200).json({
        message: "success",
        data: res.locals.users
      })
    } catch(err: any) {
      ErrorResponse.INTERNAL_SERVER_ERROR(res, err?.message);
    }
  }

  static async edit(req: Request, res: Response) {
    try {
      const userBody = req.body as IUser;

      if (checkValidation(req)) {
        ErrorResponse.BAD_REQUEST(res, checkValidation(req));
        return;
      }
      
      const sessionId: ObjectId = res.locals.users["_id"];

      const userUpdate = await User.findByIdAndUpdate(sessionId, {...userBody}, {new: true}).select(
        "_id fullname email phoneNumber gender"
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