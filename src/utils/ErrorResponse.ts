import { Response } from "express";

export class ErrorResponse {
  static ERROR_MESSAGE(msg: string) {
    return {
      status: "error",
      message: msg,
    };
  }

  static INTERNAL_SERVER_ERROR(res: Response, err?: any) {
    return res
      .status(500)
      .json(this.ERROR_MESSAGE(err || "internal server error"));
  }

  static NOT_FOUND(res: Response, err?: any) {
    return res.status(404).json(this.ERROR_MESSAGE(err || "not found"));
  }

  static UNPROCESSABLE_ENTITY(res: Response, err?: any) {
    return res.status(422).json(this.ERROR_MESSAGE(err || "not found"));
  }

  static UNAUTHORIZED(res: Response, err?: any) {
    res.status(401).json(this.ERROR_MESSAGE(err || "unauthorized"));
  }

  static BAD_REQUEST(res: Response, err?: any) {
    res.status(400).json(this.ERROR_MESSAGE(err || "bad request"));
  }

  static ACCESS_DENIED(res: Response, err?: any) {
    res.status(403).json(this.ERROR_MESSAGE(err || "access denied"));
  }
}

export const NOT_FOUND = {
  status: "error",
  message: "Internal server error",
};