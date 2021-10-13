import { Router } from "express";
import registrationValidation from "../middlewares/registrationValidation";
import InvitationController from "../controllers/api/InvitationController";
import AuthController from "../controllers/api/AuthController";
import authCheck from "../middlewares/authCheck";
import UserController from "../controllers/api/UserController";
import updateUser from "../middlewares/updateUser";
import registeredInvitation from "../middlewares/completedAccount";
import { body } from "express-validator";
import { PictureInvitationKey } from "../interfaces";
import Config from "../config";
import WeddingDateController from "../controllers/api/WeddingDateController";

const router = Router();

router
  .post('/registered/completed', authCheck, registeredInvitation, InvitationController.completedRegistration)
  .get('/invitation', authCheck, InvitationController.show)
  .put(
    '/invitation/picture', 
    authCheck, 
    body('content').custom((value: string) => {
      const base64decode = Buffer.byteLength(value.split('base64,')[1], 'base64');
      console.log((base64decode / 1000));
      
      if ((base64decode / 1000) > Config.maxImageSize) {
        return Promise.reject(`maximum content size is ${Config.maxImageSize}KB`);
      }
      if(value === undefined || value?.trim()?.length < 1) return Promise.reject("content is empty");
      return Promise.resolve();
    }), 
    body('field').custom((value: string) => {
      if(!PictureInvitationKey.includes(value)) return Promise.reject("field is not valid");
      return Promise.resolve();
    }), 
    InvitationController.images
  )
  .delete("/invitation/picture", authCheck, InvitationController.imagesDelete)
  .put("/invitation", authCheck, InvitationController.update)
  .put("/invitation/active", authCheck, InvitationController.status)
  .post("/invitation/wedding_date", authCheck, WeddingDateController.create)
  .put("/invitation/wedding_date", authCheck, WeddingDateController.update)

router
  .post("/auth/register", registrationValidation, AuthController.register)
  .post("/auth/login", AuthController.login);

router
  .get('/users', authCheck, UserController.show)
  .put('/users', authCheck, updateUser, UserController.edit)
  .put('/users/password', authCheck, UserController.editPassword)
export default router;