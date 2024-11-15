import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String },  // Store the image as a Base64 string
    createdAt: { type: Date, default: Date.now },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // associate posts with a user
});

const Post = mongoose.model('Post', postSchema);
export default Post;
