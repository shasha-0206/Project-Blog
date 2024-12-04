import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

 const JWT_SECRET = process.env.JWT_SECRET;

const fetchUser = (req, res, next) => {
    // Get the user from the jwt token and add id to req object
    const token = req.header('auth-token');
    if (!token) {
        console.log('No token provided');
        return res.status(401).send({ error: "Please authenticate using a valid token" })
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        console.log('User authenticated:', req.user);
        next();
    } catch (error) {
        console.error('Invalid token:', error.message);
        return res.status(401).send({ error: "Please authenticate using a valid token" });
    }

};


export default fetchUser;
