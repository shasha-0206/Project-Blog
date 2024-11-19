import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from './models/User.js';
import Post from './Models/Post.js';
import cors from 'cors';
import multer from 'multer';
import fetchUser from './middleware/fetchUser.js';
import dotenv from 'dotenv';
import { body, validationResult } from 'express-validator';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret_key';

const app = express();
const PORT = process.env.PORT || 3000;


// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
const DB_URL = process.env.DB_URL;
mongoose.connect(DB_URL)
    .then(() => console.log('MongoDB connection successful'))
    .catch(error => console.log(`MongoDB connection failed due to ${error}`));


// Signup Route
app.post('/signup',[
    body('username', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
  ], async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json({ success, message: 'Validation failed', errors: errors.array() });
    
    }
    const { username, email, password } = req.body;
    


    try {

        // checking if user already exist
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // hashing pass if user is new
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, email, password: hashedPassword });

        await user.save();

        // authentication
        try {
            const data = { user: { id: user.id } };
            const authtoken = jwt.sign(data, JWT_SECRET);
            console.log("JWT_SECRET:", JWT_SECRET);
            success = true;
            res.json({ success: success, authtoken: authtoken })

        } catch (error) {
            // console.log("JWT_SECRET:", JWT_SECRET); // This should print the secret key or the default value.
            console.error("Token generation error:", error);
            res.status(500).json({ message: 'Signup failed due to token generation', error: error.message });

        }
    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({ message: JWT_SECRET, error: error.message });
    }
});


// Login Route
app.post('/login',[
    body('username', 'Enter a valid name').isLength({ min: 3 }),
    
  ], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { username, password } = req.body;
    let success = false;

    try {

        // finding user
        const user = await User.findOne({ username });
        if (!user) return res.status(400).json({ message: 'Invalid  User credentials' });

        // checking pass with bcrypt
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) return res.status(400).json({ message: 'Invalid Password ' });
        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ success: success, authtoken: authtoken })


    } catch (error) {
        res.status(500).json({ message: 'Login failed', error: error.message });
    }
});


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// image saving in mongo
app.post('/posts', fetchUser, upload.single('image'), async (req, res) => {

    // getting title and content
    const { title, content } = req.body;

    // getting image from frontend
    const imageFile = req.file;
    let success = false;

    if (!title || !content || !imageFile) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    let imageBase64 = null;
    if (imageFile) {
        imageBase64 = imageFile.buffer.toString('base64');
        // converting image to string for saving into mongo
    }

    const user = await User.findById(req.user.id);
    if (!user) {
        return res.status(500).json({ message: 'Failed to create post', error: error.message });
    }

    else {
        success = true;
        try {
            const newPost = new Post({
                title,
                content,
                image: imageBase64,
                user: req.user.id

            });

            await newPost.save();
            // post saved in mongo

            res.status(201).json({ sucsess: success, message: 'Post created successfully', post: newPost });

        } catch (error) {
            console.error('Error creating post:', error);
            res.status(500).json({ message: 'Failed to create post', error: error.message }); en
        }
    }
});


// for getting post (Home page) from backend 
app.get('/posts', async (req, res) => {
    try {

        // section = a part of home page which consist 1-6 posts
        const section = parseInt(req.query.page) || 1;  // Default to page 1

        const limit = 6;  // Number of posts per page

        // skiping prev pages
        const skip = (section - 1) * limit;  

        // fetching the number of total docs
        const totalPosts = await Post.countDocuments();

        // fetching data by skiping and limiting data
        const posts = await Post.find()
        // for reversing 
        .sort({ createdAt: -1 })
        // for skiping already loaded data
        .skip(skip)
        // for limiting to load only 6 
        .limit(limit);

        const postsWithUsernames = [];

        // Use a for...of loop to iterate through posts and fetch usernames sequentially
        for (let post of posts) {
            const user = await User.findById(post.user); // Fetch the user by userId
            postsWithUsernames.push({
                ...post.toObject(), // Convert the mongoose document to a plain object
                username: user ? user.username : 'Unknown' // Add the username to the post object
            });
        }

        res.status(200).json({ posts: postsWithUsernames, totalPosts: totalPosts});
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ message: 'Failed to load posts', error: error.message });
    }
});

// for showing post details when clicked 
app.get('/posts/:postId', async (req, res) => {
    const { postId } = req.params;

    // Fetch the post from the database
    const post = await Post.findById(postId);
    if (!post) {
        return res.status(404).json({ message: 'Post not found' });
    }
    res.json({ post });
});

// for edittinf post
app.put('/posts/:postId', upload.single('image'), async (req, res) => {
    const { title, content } = req.body;
    const { postId } = req.params;
    let imageBase64 = null;
    
    // If an image is uploaded, convert it to base64
    if (req.file) {
        console.log('Image uploaded:', req.file);
        imageBase64 = req.file.buffer.toString('base64');
    }

    try {
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Log the incoming data
        console.log('Received data:', { title, content, imageBase64 });

        post.title = title || post.title;
        post.content = content || post.content;
        post.image = imageBase64 || post.image;

        // Save the updated post
        await post.save();
        console.log('Post updated:', post);
        res.status(200).json({ message: 'Post updated successfully', post });
    } catch (error) {
        console.error('Error updating post:', error);
        res.status(500).json({ message: 'Failed to update post', error: error.message });
    }
});



// for deleting post
app.delete('/posts/:postId', async (req, res) => {
    const { postId } = req.params;// retriv from search bar
    try {
        // finding post in mongo
        const deletedPost = await Post.findByIdAndDelete(postId);

        if (!deletedPost) {
            return res.status(404).json({ error: 'Post not found' });
        }

        res.status(200).json({ message: 'Post deleted successfully' });

    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
