import { Request, Response } from "express";
import { IWeddingDateUpdate } from "../../interfaces";
import WeddingDate from "../../models/WeddingDate";
import { ErrorResponse } from "../../utils/ErrorResponse";

export default class WeddingDateController {
  static async all(req: Request, res: Response) {
    try {
      const session = res.locals.users;

      const weddingdate = await WeddingDate.find({invitation: session["invitation"]});

      res.status(200).json({
        status: "success",
        data: weddingdate
      })
    } catch(err: any) {
      ErrorResponse.INTERNAL_SERVER_ERROR(res, err?.message);
    }
  }

  static async create(req: Request, res: Response) {
    try {
      const reqData = req.body;

      delete reqData!["invitation"];

      const session = res.locals.users;

      const checkWeddingDate = await WeddingDate.findOne({invitation: session["invitation"]}).countDocuments();

      if (checkWeddingDate >= 2) return ErrorResponse.BAD_REQUEST(res, "maximum wedding date is 2");
      
      const weddingDate = await new WeddingDate({
        ...reqData,
        invitation: session["invitation"],
      }).save();

      res.status(200).json({
        status: "success",
        data: weddingDate,
      });
    } catch (err: any) {
      ErrorResponse.INTERNAL_SERVER_ERROR(res, err?.message);
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const reqData = req.body as IWeddingDateUpdate;
      const { id } = req.params;

      if (id === undefined) return ErrorResponse.BAD_REQUEST(res, "id is empty");

      delete reqData!["invitation"];

      const session = res.locals.users;
      
      try {
        const weddingdate = await WeddingDate.findOneAndUpdate(
          {_id: id, invitation: session["invitation"]},
          reqData,
          {new: true}
        );
  
        res.status(200).json({
          status: "success",
          data: weddingdate
        })
        
      } catch (err) {
        ErrorResponse.INTERNAL_SERVER_ERROR(res, "failed to update or id is not found");
      }
    } catch (err: any) {
      ErrorResponse.INTERNAL_SERVER_ERROR(res, err?.message);
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!id) return ErrorResponse.BAD_REQUEST(res, "id is empty");

      const session = res.locals.users;

      try {
        await WeddingDate.findOneAndDelete({_id: id, invitation: session["invitation"]});

        res.status(200).json({
          status: "success",
          data: {}
        })
        
      } catch (err) {
        ErrorResponse.INTERNAL_SERVER_ERROR(res, "failed to delete or id is not found");
      }
    } catch(err: any) {
      ErrorResponse.INTERNAL_SERVER_ERROR(res, err?.message);
    }
  }
}