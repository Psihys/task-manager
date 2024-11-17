import bcrypt from 'bcrypt';
import User from '../models/userModule.js';

export default async (req, res, next) => {
    try {
        if (
            !req.headers.authorization ||
            !req.headers.authorization.startsWith('Basic ')
        ) {
            return res
                .status(401)
                .json({ message: 'Invalid authorization header' });
        }

        const base64Credentials = req.headers.authorization.split(' ')[1];
        const credentials = Buffer.from(base64Credentials, 'base64').toString(
            'ascii'
        );
        const [email, password] = credentials.split(':');

        if (!email || !password) {
            return res
                .status(400)
                .json({ message: 'Email and password must be provided' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            return res
                .status(400)
                .json({ message: 'Invalid password or email' });
        }

        // Attach user object with `_id` to the request
        req.user = {
            id: user._id.toString(), // Convert ObjectId to string
            _id: user._id.toString(), // Convert ObjectId to string
            email: user.email,
            userName: user.userName,
            role: user.role,
        };



        console.log('Authenticated user:', req.user); // Debug log

        next();
    } catch (error) {
        console.error('Authentication error:', error);
        return res
            .status(500)
            .json({
                message: 'Authentication failed. Please try again later.',
            });
    }
};
