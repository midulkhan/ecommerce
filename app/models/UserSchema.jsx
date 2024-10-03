import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },
  verifyToken: {
    type: String,
  },
  VerificationExpiry: Date,
});

const Users = mongoose.models.users || mongoose.model("users", UserSchema);
export default Users;
