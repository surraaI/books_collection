const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'].split(' ')[1];
    if (!token) {
        return res.status(401).json({ success: false, message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'dfafjaiqepfjpoadjsfjap');
        req.user = decoded; 
        next();
    } catch (error) {
        console.error('Token verification failed:', error);
        return res.status(403).json({ success: false, message: 'Invalid or expired token.' });
    }
};

const authorizeRole = (requiredRole) => (req, res, next) => {
    authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({
            success: false,
            message: 'Access denied. No token provided.',
        });
    }
    token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'dfafjaiqepfjpoadjsfjap');

        role = decoded.role;

        if (role !== requiredRole) {
            return res.status(403).json({
                success: false,
                message: 'Access denied. You do not have the required permissions.',
            });
        }
    }
    catch (error) {
        console.error('Token verification failed:', error);
        return res.status(403).json({
            success: false,
            message: 'Invalid or expired token.',
        });
    }

    next();
};


module.exports = {authorizeRole, authenticateToken};

