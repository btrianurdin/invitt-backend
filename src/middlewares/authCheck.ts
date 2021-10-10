import { NextFunction, Request, Response } from "express";
import User, { IUserModel } from "../models/User";
import { ErrorResponse } from "../utils/ErrorResponse";
import { verifyToken } from "../utils/jwtToken";

const authCheck = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const getToken = req.headers['authorization'];
    if (!getToken) throw new Error();

    const token = getToken && getToken.replace("Bearer ", "");

    const payload: any = verifyToken(token);

    try {
      const users = await User.findOne({_id: payload["_id"]}).select(
        "_id status"
      );
      if (!users) throw new Error();

      res.locals.users = users.toObject();
  
      next();
    } catch(err: any) {
      throw new Error("notfound");
    }
  } catch(err: any) {
    if (err.message === "notfound") return ErrorResponse.NOT_FOUND(res, "user not found"); 
    ErrorResponse.UNAUTHORIZED(res, err?.message); 
  }
}

export default authCheck;