import { Audit, AuditSubmission } from "../models/audit.model.js";
import { User } from "../models/user.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import apiResponse from "../utils/apiResponse.js";
import apiError from "../utils/apiError.js";

export const assignAudit = asyncHandler(async (req, res) => {
  const { auditType, hospitalType, hospital, assignDate, userId } = req.body;
  const user = await User.findById(userId);
  if (!user) throw new apiError(404, "User not found");

  // Create a new audit with 'incompleted' status
  const audit = new Audit({
    auditType,
    hospitalType,
    hospital,
    assignDate,
    user: userId,
    status: "incompleted", // Initial status
  });

  await audit.save();

  return res
    .status(201)
    .json(new apiResponse(201, audit, "Audit created successfully"));
});

export const submitAuditSurvey = asyncHandler(async (req, res) => {
  const { auditId, startDate, completeDate, questionsAndAnswers } = req.body;

  const audit = await Audit.findById(auditId);
  if (!audit) throw new apiError(404, "Audit not found");

  if (audit.status === "completed") {
    throw new apiError(400, "This audit has already been completed.");
  }

  audit.status = "completed";
  await audit.save();

  const auditSubmission = new AuditSubmission({
    audit: auditId,
    user: req.user._id,
    assignDate: audit.assignDate,
    startDate,
    completeDate,
    questionsAndAnswers,
  });

  await auditSubmission.save();

  return res
    .status(200)
    .json(
      new apiResponse(
        200,
        auditSubmission,
        "Audit survey completed successfully"
      )
    );
});

export const getAuditDetails = asyncHandler(async (req, res) => {
  const { auditId } = req.params;

  const audit = await Audit.findById(auditId);
  if (!audit) throw new apiError(404, "Audit not found");

  const auditSubmission = await AuditSubmission.findOne({
    audit: auditId,
  }).populate("user");
  if (!auditSubmission) throw new apiError(404, "Audit submission not found");

  return res
    .status(200)
    .json(
      new apiResponse(
        200,
        { audit, auditSubmission },
        "Audit details fetched successfully"
      )
    );
});
