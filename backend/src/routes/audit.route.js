import { Router } from "express";
import {
  assignAudit,
  submitAuditSurvey,
} from "../controllers/audit.controller.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/asign").post(verifyJwt, assignAudit);
router.route("/survey").post(verifyJwt, submitAuditSurvey);

export default router;
