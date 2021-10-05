import { Router } from "express";
import registrationValidation from "../middlewares/registrationValidation";
import InvitationController from "../controllers/api/InvitationController";
import AuthController from "../controllers/api/AuthController";
import authCheck from "../middlewares/authCheck";
import UserController from "../controllers/api/UserController";

const router = Router();

router
  .post('/invitation', InvitationController.create)

router
  .post("/auth/register", registrationValidation, AuthController.register)
  .post("/auth/login", AuthController.login);

router
  .get('/users', authCheck, UserController.show)
  .put('/users', authCheck, UserController.edit)
export default router;