import { Request, Response } from "express";
import { compare} from 'bcrypt';
import User, { IUserModel } from "../../models/User";
import { ErrorResponse } from "../../utils/ErrorResponse";
import { createToken } from "../../utils/jwtToken";
import { checkValidation } from "../../utils/validation";
import Invitation, { IInvitationModel } from "../../models/Invitation";
import { ObjectId } from "mongoose";
import { IRegisteredInvitation } from "../../interfaces";

export default class AuthController {
  static async register(req: Request, res: Response) {
    try {
      if (checkValidation(req)) {
        ErrorResponse.BAD_REQUEST(res, checkValidation(req));
        return;
      }
      try {
        const user = new User({...req.body, status: "incomplete" }  as IUserModel);
        const userSave = await user.save();

        const token = await createToken({
          _id: userSave["_id"],
        });

        res.status(200).json({
          status: "success",
          data: {
            token,
          },
        });
      } catch(err: any) {
        ErrorResponse.BAD_REQUEST(res, err.message)
      }
    } catch (err: any) {
      ErrorResponse.INTERNAL_SERVER_ERROR(res, err.message);
    }
  }

  static async completed(req: Request, res: Response) {
    try {
      const invitationBody = req.body as IRegisteredInvitation;
      const session = res.locals.users;
      
      if (session["status"] === 'complete') {
        return ErrorResponse.BAD_REQUEST(res, "user registration has been complete");
      }
      
      if (checkValidation(req)) {
        ErrorResponse.BAD_REQUEST(res, checkValidation(req));
        return;
      }

      const invitation = new Invitation({...invitationBody, status: 'hide'});
      invitation.save();
      
      if (invitation) {
        await User.findByIdAndUpdate(session["_id"], {status: "complete", invitation: invitation["_id"]});
      }

      res.status(200).json({
        message: "success",
        data: invitation
      })
      
    } catch (err: any) {
      ErrorResponse.INTERNAL_SERVER_ERROR(res, err?.message);
    }
  }


  static async login(req: Request, res: Response) {
    try{
      const { email, password } = req.body as IUserModel;

      const user = await User.findOne({ email }).select("_id email fullname password");
      if (!user) throw new Error("notfound");

      const check = await compare(password, user.password);
      if (!check) throw new Error("notfound");

      const token = await createToken({
        _id: user["_id"],
      });

      res.status(200).json({
        status: "success",
        data: {
          token
        }
      })
    } catch(err: any) {
      if (err?.message == "notfound") return ErrorResponse.BAD_REQUEST(res, "email or password is not valid");
      ErrorResponse.INTERNAL_SERVER_ERROR(res, err.message);
    }
  }

  static async isAuth(req: Request, res: Response) {
    try {
      const sessionId: ObjectId = res.locals.users["_id"];

      const user = await User.findOne({_id: sessionId}).select(
        "_id fullname email phoneNumber gender status invitation"
      )

      res.status(200).json({
        status: "success",
        data: user
      });
    } catch(err: any) {
      ErrorResponse.INTERNAL_SERVER_ERROR(res, err?.message);
    }
  }
}

