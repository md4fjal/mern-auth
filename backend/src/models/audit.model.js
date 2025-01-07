import mongoose from "mongoose";

const auditSchema = new mongoose.Schema(
  {
    auditType: {
      type: String,
      required: true,
    },
    hospitalType: {
      type: String,
      required: true,
    },
    hospital: {
      type: String,
      required: true,
    },
    assignDate: {
      type: Date,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["incompleted", "completed"],
      default: "incompleted",
    },
  },
  { timestamps: true }
);

const auditSubmissionSchema = new mongoose.Schema(
  {
    audit: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Audit", // Link to the Audit model
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    assignDate: {
      type: Date,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    completeDate: {
      type: Date,
      required: true,
    },
    questionsAndAnswers: [
      {
        question: {
          type: String,
          required: true,
        },
        answer: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);
export const Audit = mongoose.model("Audit", auditSchema);

export const AuditSubmission = mongoose.model(
  "AuditSubmission",
  auditSubmissionSchema
);
