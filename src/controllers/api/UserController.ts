import { Request, Response } from "express";
import { ObjectId } from "mongoose";
import { IUser } from "../../interfaces";
import User from "../../models/User";
import { ErrorResponse } from "../../utils/ErrorResponse";

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
}