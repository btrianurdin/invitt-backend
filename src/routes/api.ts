import { Router } from "express";
import registrationValidation from "../utils/validation/registrationValidation";
import Config from "../config";
import InvitationController from "../controllers/api/InvitationController";
import AuthController from "../controllers/api/AuthController";

const router = Router();

router
  .post('/invitation', InvitationController.create)

router.post("/auth/register", registrationValidation, AuthController.register);

export default router;