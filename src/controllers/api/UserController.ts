import { Request, Response } from "express";
import { ObjectId } from "mongoose";
import { compare } from 'bcrypt';
import { IPublicUser } from "../../interfaces";
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

      delete userBody["password"];
      delete userBody["status"];
      delete userBody["email"];

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
      const { oldPassword, newPassword } = req.body as {oldPassword: string, newPassword: string};
      const sessionId: ObjectId = res.locals.users["_id"];

      if (checkValidation(req)) return ErrorResponse.BAD_REQUEST(res, checkValidation(req));

      const user = await User.findById(sessionId);
      // check user
      if (!user) return ErrorResponse.BAD_REQUEST(res, "user is not found");
      
      // check old password
      const checkOldPassword = await compare(oldPassword, user.password);
      if (!checkOldPassword) return ErrorResponse.BAD_REQUEST(res, "old password is not valid");

      Object.assign(user, {
        password: newPassword
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