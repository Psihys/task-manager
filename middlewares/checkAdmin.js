export default async (req, res, next) => {
    try {
        if (!req.user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied' });
        }

        next();
    } catch (er) {
        console.error(er);
        res.status(500).json({ message: 'Server error' });
    }
}