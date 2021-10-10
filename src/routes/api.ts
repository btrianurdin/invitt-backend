import { Router } from "express";
import registrationValidation from "../middlewares/registrationValidation";
import InvitationController from "../controllers/api/InvitationController";
import AuthController from "../controllers/api/AuthController";
import authCheck from "../middlewares/authCheck";
import UserController from "../controllers/api/UserController";
import updateUser from "../middlewares/updateUser";
import registeredInvitation from "../middlewares/completedAccount";

const router = Router();

router
  .post('/registered/completed', authCheck, registeredInvitation, InvitationController.completedRegistration)
  .get('/invitation', authCheck, InvitationController.show)
  .post('/invitation', InvitationController.create)

router
  .post("/auth/register", registrationValidation, AuthController.register)
  .post("/auth/login", AuthController.login);

router
  .get('/users', authCheck, UserController.show)
  .put('/users', authCheck, updateUser, UserController.edit)
  .put('/users/password', authCheck, UserController.editPassword)
export default router;