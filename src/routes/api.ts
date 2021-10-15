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
import GalleryController from "../controllers/api/GalleryController";
import GuestbookController from "../controllers/api/GuestbookController";

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
  .post("/invitations/wedding_dates", authCheck, WeddingDateController.create)
  .put("/invitations/wedding_dates", authCheck, WeddingDateController.update)
  .delete("/invitations/wedding_dates", authCheck, WeddingDateController.delete)
  .get("/invitations/wedding_dates", authCheck, WeddingDateController.all)
  .post("/invitations/galleries", authCheck, body('content').custom(uploadContent), GalleryController.create)
  .delete("/invitations/galleries", authCheck, GalleryController.delete)
  .get("/invitations/galleries", authCheck, GalleryController.all);

router
  .post(
    "/guestbooks/:slug", 
    body("guest_name").notEmpty(),
    body("attendance").notEmpty(),
    body("message").notEmpty(),
    GuestbookController.create
  )
  .get("/guestbooks/:slug", GuestbookController.all)

router
  .post("/auth/register", registrationValidation, AuthController.register)
  .post("/auth/login", AuthController.login);

router
  .get('/users', authCheck, UserController.show)
  .put('/users', authCheck, updateUser, UserController.edit)
  .put('/users/password', authCheck, UserController.editPassword);

export default router;