import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  username: {
     type: String,
      unique: true
     },
  password: {
     type: String,
      required: true 
    }, 
  bio: { 
    type: String,
     maxLength: 200 
    }, 
  profileImage: {
     url: String,
     filename: String,//to manage images in Cloudinary
    }, 
  socialLinks: { 
    facebook: String,
    instagram: String,
    twitter: String,
    linkedin: String,
  },
});

export default mongoose.model("User", userSchema);
