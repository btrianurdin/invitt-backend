import { Request, Response } from "express";
import User, { IUserModel } from "../../models/User";
import { ErrorResponse } from "../../utils/ErrorResponse";
import { checkValidation } from "../../utils/validation";

export default class AuthController {
  static async register(req: Request, res: Response) {
    try {
      if (checkValidation(req)) {
        ErrorResponse.BAD_REQUEST(res, checkValidation(req));
        return;
      }
      try {
        const users = new User(req.body as IUserModel);
        const usersSave = await users.save();

        res.status(200).json({
          status: "success",
          data: usersSave,
        });
      } catch(err) {
        ErrorResponse.BAD_REQUEST(res, err.message)
      }
    } catch (err) {
      ErrorResponse.INTERNAL_SERVER_ERROR(res, err.message);
    }
  }
}

