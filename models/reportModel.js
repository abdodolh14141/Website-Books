import mongoose from "mongoose";

// Define the user schema
const SchemaReport = new mongoose.Schema({
  Email: {
    type: String,
    required: true,
    unique: true,
  },
  Message: {
    type: String,
    required: true,
  },
  DateCreated: {
    type: Date,
    default: Date.now, // Automatically set the creation date
  },
});

// Check if the model already exists and use it if it does
const ReportModel =
  mongoose.models.ReportModel || mongoose.model("Reports", SchemaReport);

export default ReportModel;
