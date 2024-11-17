import bcrypt from 'bcrypt';
import User from '../models/userModule.js';


export const register = async (req, res) => {
    try {
        const { userName, email, password, role } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(req.body.password, salt);

        const user = await User.create({
            userName,
            email,
            password: hash,
            role,
        });

        const { password: _, ...userData } = user._doc;

        res.status(201).json(userData);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const {email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: 'User not found',
            });
        }
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            return res.status(400).json({
                message: 'Invalid password or email',
            });
        }

        const { password: _, ...userData } = user._doc;

        return res.status(201).json(userData);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
};
