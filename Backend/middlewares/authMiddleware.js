const jwt = require('jsonwebtoken');

// Middleware to verify token
const verifyToken = (req, res, next) => {
 
  const token = req.headers['authorization']?.split(' ')[1]; // Assuming the format is "Bearer <token>"
  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized! Invalid token.' });
    }
    req.userRole = decoded.role;
    next(); 
  });
};

// Middleware to check user role
const checkRole = (roles) => {
  return (req, res, next) => {
    if (!req.userRole || !roles.includes(req.userRole)) {
      return res.status(403).json({ message: 'Forbidden! You do not have the required role.' });
    }
    next();
  };
};

module.exports = { verifyToken, checkRole };
