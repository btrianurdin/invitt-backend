import { Request, Response } from "express";
import { IGuestBookCreate } from "../../interfaces";
import Guestbook from "../../models/Guestbook";
import Invitation from "../../models/Invitation";
import { ErrorResponse } from "../../utils/ErrorResponse";
import { checkValidation } from "../../utils/validation";

export default class GuestbookController {
  static async create(req: Request, res: Response) {
    try {
      const { slug } = req.params;
      const reqData = req.body as IGuestBookCreate;

      if (checkValidation(req)) return ErrorResponse.BAD_REQUEST(res, checkValidation(req));

      delete reqData!["invitation"];

      const invitation = await Invitation.findOne({web_url: slug});
      if (!invitation) throw new Error("slug not found");

      const guestbook = new Guestbook({...reqData, invitation: invitation["_id"]});
      guestbook.save();

      res.status(200).json({
        status: "success",
        data: guestbook,
      });

    } catch(err: any) {
      ErrorResponse.INTERNAL_SERVER_ERROR(res, err?.message);
    }
  }
}