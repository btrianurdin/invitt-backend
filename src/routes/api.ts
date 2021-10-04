import { Router } from "express";
import registrationValidation from "../utils/validation/registrationValidation";
import InvitationController from "../controllers/api/InvitationController";
import AuthController from "../controllers/api/AuthController";

const router = Router();

router
  .post('/invitation', InvitationController.create)

router
  .post("/auth/register", registrationValidation, AuthController.register)
  .post("/auth/login", AuthController.login);
export default router;