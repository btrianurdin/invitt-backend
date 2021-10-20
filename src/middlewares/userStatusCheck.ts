import { NextFunction, Request, Response } from "express";
import User, { IUserModel } from "../models/User";
import { ErrorResponse } from "../utils/ErrorResponse";
import { verifyToken } from "../utils/jwtToken";

const userStatusCheck = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const getToken = req.headers['authorization'];
    if (!getToken) throw new Error();

    const token = getToken && getToken.replace("Bearer ", "");

    const payload: any = verifyToken(token);

    try {
      const users = await User.findOne({_id: payload["_id"]}).select(
        "_id status"
      );
      if (users && users.status === 'incomplete') {
        return ErrorResponse.BAD_REQUEST(res, 'User registration has not been completed')
      }

      res.locals.users = users?.toObject();
  
      next();
    } catch(err: any) {
      ErrorResponse.NOT_FOUND(res, "user not found"); 
    }
  } catch(err: any) {
    ErrorResponse.UNAUTHORIZED(res, err?.message); 
  }
}

export default userStatusCheck;