import { Request, Response } from "express";
import { compare} from 'bcrypt';
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

  static async login(req: Request, res: Response) {
    try{
      const { email, password } = req.body as IUserModel;

      const user = await User.findOne({ email }).select("_id email fullname password");
      if (!user) throw new Error("notfound");

      const check = await compare(password, user.password);
      if (!check) throw new Error("notfound");

      res.end("mantap");
    } catch(err: any) {
      if (err?.message == "notfound") return ErrorResponse.BAD_REQUEST(res, "email or password is not valid");
      ErrorResponse.INTERNAL_SERVER_ERROR(res, err.message);
    }
  }
}

