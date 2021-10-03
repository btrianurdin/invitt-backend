import { Request, Response } from "express";
import User, { IUserModel } from "../../models/User";
import { ErrorResponse } from "../../utils/ErrorResponse";
import { createAccessToken, createRefreshToken } from "../../utils/jwtToken";
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
        const access_token = await createAccessToken({
          _id: usersSave["_id"],
          email: usersSave.email,
          fullname: usersSave.fullname
        });
        const refresh_token = await createRefreshToken({
          _id: usersSave["_id"],
          email: usersSave.email,
          fullname: usersSave.fullname
        });

        res.status(200).json({
          status: "success",
          data: {
            access_token,
            refresh_token
          },
        });
      } catch(err: any) {
        ErrorResponse.BAD_REQUEST(res, err.message)
      }
    } catch (err: any) {
      ErrorResponse.INTERNAL_SERVER_ERROR(res, err.message);
    }
  }
}

