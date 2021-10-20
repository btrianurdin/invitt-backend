import { NextFunction, Request, Response } from "express";
import { ErrorResponse } from "../utils/ErrorResponse";

const userStatusCheck = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const session = res.locals.users;

    if (session && session.status !== 'complete') {
      return ErrorResponse.BAD_REQUEST(res, 'User registration has not been completed')
    }

    next();
  } catch(err: any) {
    ErrorResponse.NOT_FOUND(res, "user not found"); 
  }
}

export default userStatusCheck;