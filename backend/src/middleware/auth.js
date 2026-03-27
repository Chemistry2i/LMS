const { verifyToken } = require('../utils/helpers');
const { ForbiddenError, AuthError } = require('../exceptions/AppError');
const { ROLES } = require('../constants/appConstants');

// Verify JWT Token Middleware
const authenticate = (req, res, next) => {
  try {
    let token = req.headers.authorization;
    
    if (token && token.startsWith('Bearer ')) {
      token = token.slice(7);
    }

    if (!token) {
      throw new AuthError('No token provided');
    }

    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Invalid or expired token',
      error: error.message,
    });
  }
};

// Check Role Middleware
const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      throw new AuthError('User not authenticated');
    }

    if (!allowedRoles.includes(req.user.role)) {
      throw new ForbiddenError('Access denied');
    }

    next();
  };
};

module.exports = {
  authenticate,
  authorize,
};
