import mongoose from 'mongoose';
const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String },
    createdAt: { type: Date, default: Date.now },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    likes: { type: Number, default: 0 }, // Add likes field
    comments: [
        {
            username: { type: String },
            text: { type: String },
            createdAt: { type: Date, default: Date.now },
        },
    ], // Add comments field
});

const Post = mongoose.model('Post', postSchema);
export default Post;