import { Request, Response } from "express";
import Invitation from "../../models/Invitation";
import WeddingDate from "../../models/WeddingDate";
import { ErrorResponse } from "../../utils/ErrorResponse";

export default class WeddingDateController {
  static async create(req: Request, res: Response) {
    try {
      const reqData = req.body;

      delete reqData!["invitation"];

      const sessionId = res.locals.users["_id"];
      const invitation = await Invitation.findOne({user: sessionId}).select("_id");

      const checkWeddingDate = await WeddingDate.findOne({invitation: invitation!["_id"]}).countDocuments();

      if (checkWeddingDate >= 2) return ErrorResponse.BAD_REQUEST(res, "maximum wedding date is 2");
      
      const weddingDate = await new WeddingDate({
        ...reqData,
        invitation: invitation!["_id"],
      }).save();

      res.status(200).json({
        status: "success",
        data: weddingDate,
      });
    } catch (err: any) {
      ErrorResponse.INTERNAL_SERVER_ERROR(res, err?.message);
    }
  }
}