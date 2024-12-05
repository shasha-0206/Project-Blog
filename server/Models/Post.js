import mongoose from 'mongoose';
const postSchema = new mongoose.Schema({
    title: { 
        type: String, required: true 
    },
    content: { 
        type: String, required: true 
    },
    image: { 
        url: {
           type: String,
           required: true,
        },
        filename: {
            type: String,
            required: true,
        },
    },
    user: {
         type: mongoose.Schema.Types.ObjectId, ref: 'User' 
        },
    likes: { 
        type: Number, 
        default: 0 
    },
    likedBy: [{
         type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    comments: [
        {
            username: { type: String },
            text: { type: String },
            createdAt: { type: Date, default: Date.now },
        },
    ], // Add comments field
},{timestamps: true});

const Post = mongoose.model('Post', postSchema);
export default Post;