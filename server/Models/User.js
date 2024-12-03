import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true }, // Shared email field
  username: { type: String, unique: true }, // Shared username field
  password: { type: String, required: true }, // Password from second schema
  bio: { type: String, maxLength: 200 }, // Optional bio from first schema
  profileImage: { type: String }, // Stores image path from first schema
  socialLinks: { // Social links from first schema
    facebook: String,
    instagram: String,
    twitter: String,
    linkedin: String,
  },
});

export default mongoose.model("User", userSchema);
