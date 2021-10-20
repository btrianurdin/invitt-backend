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
import userStatusCheck from "../middlewares/userStatusCheck";
import completedAccount from "../middlewares/validations/completedAccount";
import invitationUpdate from "../middlewares/validations/invitationUpdate";

const router = Router();

router
  .get('/invitations', authCheck, userStatusCheck, InvitationController.show)
  .put("/invitations", authCheck, userStatusCheck, invitationUpdate, InvitationController.update)
  .put(
    '/invitations/picture', 
    authCheck, 
    userStatusCheck,
    body('content').custom(uploadContent), 
    body('field').custom(uploadPictureField), 
    InvitationController.images
  )
  .delete(
    "/invitations/picture", 
    authCheck, 
    userStatusCheck,
    body('field').custom(uploadPictureField),
    InvitationController.imagesDelete
  )
  .post("/invitations/wedding-dates", authCheck, userStatusCheck, WeddingDateController.create)
  .get("/invitations/wedding-dates", authCheck, userStatusCheck, WeddingDateController.all)
  .put("/invitations/wedding-dates/:id", authCheck, userStatusCheck, WeddingDateController.update)
  .delete("/invitations/wedding-dates/:id", authCheck, userStatusCheck, WeddingDateController.delete)
  .post(
    "/invitations/galleries", 
    authCheck, 
    userStatusCheck,
    body('content').custom(uploadContent), 
    GalleryController.create
  )
  .get("/invitations/galleries", authCheck, userStatusCheck, GalleryController.all)
  .delete("/invitations/galleries/:id", authCheck, userStatusCheck, GalleryController.delete);
  //   .put("/invitations/active", authCheck, InvitationController.status)

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
  .post("/auth/register/completed", authCheck, completedAccount, AuthController.completed)
  .post("/auth/login", AuthController.login)
  .post("/auth/is-auth", authCheck, AuthController.isAuth)
  .post("/auth/forgot-password", AuthController.forgotPassword)
  .post("/auth/reset-password", AuthController.resetPassword);

router
  .get('/users', authCheck, userStatusCheck, UserController.show)
  .put('/users', authCheck, userStatusCheck, updateUser, UserController.edit)
  .put(
    '/users/password', 
    authCheck, 
    userStatusCheck, 
    body("oldPassword").isString(),
    body("newPassword").isString(),
    UserController.editPassword
  );

export default router;