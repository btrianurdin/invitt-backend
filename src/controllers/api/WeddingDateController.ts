import { Request, Response } from "express";
import { Schema } from "express-validator";
import { ObjectId } from "mongoose";
import { IWeddingDateUpdate } from "../../interfaces";
import Invitation from "../../models/Invitation";
import WeddingDate from "../../models/WeddingDate";
import { ErrorResponse } from "../../utils/ErrorResponse";

export default class WeddingDateController {
  static async all(req: Request, res: Response) {
    try {
      const sessionId = res.locals.users["_id"];
      const invitation = await Invitation.findOne({user: sessionId}).select("_id");

      const weddingdate = await WeddingDate.find({invitation: invitation!["_id"]});

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

  static async update(req: Request, res: Response) {
    try {
      const reqData = req.body as IWeddingDateUpdate;

      if (reqData.id === undefined) return ErrorResponse.BAD_REQUEST(res, "id is empty");

      delete reqData!["invitation"];

      const sessionId = res.locals.users["_id"];
      const invitation = await Invitation.findOne({user: sessionId}).select("_id");

      try {
        const weddingdate = await WeddingDate.findOneAndUpdate(
          {_id: reqData.id, invitation: invitation!["_id"]},
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
       const {id} = req.body as {id: ObjectId};

       if (!id) return ErrorResponse.BAD_REQUEST(res, "id is empty");

       const sessionId = res.locals.users["_id"];
       const invitation = await Invitation.findOne({user: sessionId}).select("_id");

      try {
        await WeddingDate.findOneAndDelete({_id: id, invitation: invitation!["_id"]});

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