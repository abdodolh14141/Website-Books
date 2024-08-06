import mongoose from "mongoose";

// Define the user schema
const SchemaUser = new mongoose.Schema({
  UserName: {
    type: String,
    required: true,
    unique: true,
  },
  Email: {
    type: String,
    required: true,
    unique: true, // Ensure unique email addresses
  },
  Password: {
    type: String,
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  DateCreated: {
    type: Date,
    default: Date.now, // Automatically set the creation date
  },
});

// Check if the model already exists and use it if it does
const User = mongoose.models.User || mongoose.model("User", SchemaUser);

export default User;
