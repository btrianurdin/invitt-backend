import { Router } from "express";
import registrationValidation from "../middlewares/validations/registrationValidation";
import InvitationController from "../controllers/api/InvitationController";
import AuthController from "../controllers/api/AuthController";
import authCheck from "../middlewares/authCheck";
import UserController from "../controllers/api/UserController";
import updateUser from "../middlewares/validations/updateUser";
import registeredInvitation from "../middlewares/validations/completedAccount";
import { body } from "express-validator";
import WeddingDateController from "../controllers/api/WeddingDateController";
import { uploadContent, uploadPictureField } from "../middlewares/validations/imageUpload";

const router = Router();

router
  .post('/register/completed', authCheck, registeredInvitation, InvitationController.completedRegistration)
  .get('/invitations', authCheck, InvitationController.show)
  .put("/invitations", authCheck, InvitationController.update)
  .put(
    '/invitations/picture', 
    authCheck, 
    body('content').custom(uploadContent), 
    body('field').custom(uploadPictureField), 
    InvitationController.images
  )
  .delete("/invitations/picture", authCheck, InvitationController.imagesDelete)
  .put("/invitations/active", authCheck, InvitationController.status)
  .post("/invitations/wedding_date", authCheck, WeddingDateController.create)
  .put("/invitations/wedding_date", authCheck, WeddingDateController.update)
  .delete("/invitations/wedding_date", authCheck, WeddingDateController.delete)
  .get("/invitations/wedding_date", authCheck, WeddingDateController.all)

router
  .post("/auth/register", registrationValidation, AuthController.register)
  .post("/auth/login", AuthController.login);

router
  .get('/users', authCheck, UserController.show)
  .put('/users', authCheck, updateUser, UserController.edit)
  .put('/users/password', authCheck, UserController.editPassword)
  
export default router;