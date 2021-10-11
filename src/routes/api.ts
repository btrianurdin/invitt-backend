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

const router = Router();

router
  .post('/registered/completed', authCheck, registeredInvitation, InvitationController.completedRegistration)
  .get('/invitation', authCheck, InvitationController.show)
  .post('/invitation', InvitationController.create)
  .put(
    '/invitation/picture', 
    authCheck, 
    body('content').custom((value: string) => {
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

router
  .post("/auth/register", registrationValidation, AuthController.register)
  .post("/auth/login", AuthController.login);

router
  .get('/users', authCheck, UserController.show)
  .put('/users', authCheck, updateUser, UserController.edit)
  .put('/users/password', authCheck, UserController.editPassword)
export default router;