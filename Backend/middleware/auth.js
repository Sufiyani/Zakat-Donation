// const jwt = require('jsonwebtoken');
// const User = require('../models/User');

// // Protect routes - verify JWT token
// const protect = async (req, res, next) => {
//   let token;

//   if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
//     try {
//       // Get token from header
//       token = req.headers.authorization.split(' ')[1];

//       // Verify token
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);

//       // Get user from token
//       req.user = await User.findById(decoded.id).select('-password');

//       if (!req.user) {
//         return res.status(401).json({ message: 'User not found' });
//       }

//       next();
//     } catch (error) {
//       console.error(error);
//       return res.status(401).json({ message: 'Not authorized, token failed' });
//     }
//   }

//   if (!token) {
//     return res.status(401).json({ message: 'Not authorized, no token' });
//   }
// };

// // Admin only middleware
// const admin = (req, res, next) => {
//   if (req.user && req.user.role === 'admin') {
//     next();
//   } else {
//     res.status(403).json({ message: 'Access denied. Admin only.' });
//   }
// };

// module.exports = { protect, admin };

// import jwt from 'jsonwebtoken';
// import User from '../models/User.js';

// // Protect routes - verify JWT token
// export const protect = async (req, res, next) => {
//   let token;

//   if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
//     try {
//       // Get token from header
//       token = req.headers.authorization.split(' ')[1];

//       // Verify token
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);

//       // Get user from token
//       req.user = await User.findById(decoded.id).select('-password');

//       if (!req.user) {
//         return res.status(401).json({ message: 'User not found' });
//       }

//       next();
//     } catch (error) {
//       console.error(error);
//       return res.status(401).json({ message: 'Not authorized, token failed' });
//     }
//   }

//   if (!token) {
//     return res.status(401).json({ message: 'Not authorized, no token' });
//   }
// };

// // Admin only middleware
// export const admin = (req, res, next) => {
//   if (req.user && req.user.role === 'admin') {
//     next();
//   } else {
//     res.status(403).json({ message: 'Access denied. Admin only.' });
//   }
// };

// backend/middleware/auth.js
// const jwt = require('jsonwebtoken');
// const User = require('../models/User');

// /**
//  * Protect routes - Verify JWT token
//  */
// exports.protect = async (req, res, next) => {
//   let token;

//   // Check for token in Authorization header
//   if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
//     try {
//       // Get token from header
//       token = req.headers.authorization.split(' ')[1];

//       // Verify token
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);

//       // Get user from token
//       req.user = await User.findById(decoded.id).select('-password');

//       if (!req.user) {
//         return res.status(401).json({
//           success: false,
//           message: 'User not found',
//         });
//       }

//       // Check if user is active
//       if (!req.user.isActive) {
//         return res.status(401).json({
//           success: false,
//           message: 'Account is deactivated',
//         });
//       }

//       next();
//     } catch (error) {
//       console.error('Auth middleware error:', error);
//       return res.status(401).json({
//         success: false,
//         message: 'Not authorized, token failed',
//       });
//     }
//   }

//   if (!token) {
//     return res.status(401).json({
//       success: false,
//       message: 'Not authorized, no token',
//     });
//   }
// };

// /**
//  * Admin only middleware
//  */
// exports.admin = (req, res, next) => {
//   if (req.user && req.user.role === 'admin') {
//     next();
//   } else {
//     res.status(403).json({
//       success: false,
//       message: 'Not authorized as admin',
//     });
//   }
// };

// /**
//  * Optional auth - Attach user if token exists, but don't fail if no token
//  */
// exports.optionalAuth = async (req, res, next) => {
//   let token;

//   if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
//     try {
//       token = req.headers.authorization.split(' ')[1];
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
//       req.user = await User.findById(decoded.id).select('-password');
//     } catch (error) {
//       // Token invalid, but continue without user
//       req.user = null;
//     }
//   }

//   next();
// };


// import jwt from 'jsonwebtoken';
// import User from '../models/User.js';

// /**
//  * Protect routes - Verify JWT token
//  */
// export const protect = async (req, res, next) => {
//   let token;

//   // Check for token in Authorization header
//   if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
//     try {
//       // Get token from header
//       token = req.headers.authorization.split(' ')[1];

//       // Verify token
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);

//       // Get user from token
//       req.user = await User.findById(decoded.id).select('-password');

//       if (!req.user) {
//         return res.status(401).json({
//           success: false,
//           message: 'User not found',
//         });
//       }

//       // Check if user is active
//       if (!req.user.isActive) {
//         return res.status(401).json({
//           success: false,
//           message: 'Account is deactivated',
//         });
//       }

//       next();
//     } catch (error) {
//       console.error('Auth middleware error:', error);
//       return res.status(401).json({
//         success: false,
//         message: 'Not authorized, token failed',
//       });
//     }
//   }

//   if (!token) {
//     return res.status(401).json({
//       success: false,
//       message: 'Not authorized, no token',
//     });
//   }
// };

// /**
//  * Admin only middleware
//  */
// export const admin = (req, res, next) => {
//   if (req.user && req.user.role === 'admin') {
//     next();
//   } else {
//     res.status(403).json({
//       success: false,
//       message: 'Not authorized as admin',
//     });
//   }
// };

// /**
//  * Optional auth - Attach user if token exists, but don't fail if no token
//  */
// export const optionalAuth = async (req, res, next) => {
//   let token;

//   if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
//     try {
//       token = req.headers.authorization.split(' ')[1];
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
//       req.user = await User.findById(decoded.id).select('-password');
//     } catch (error) {
//       // Token invalid, but continue without user
//       req.user = null;
//     }
//   }

//   next();
// };


import jwt from 'jsonwebtoken';
import User from '../models/User.js';

/**
 * Protect routes - Verify JWT token
 */
export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from token and attach to request
      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'User not found or token invalid',
        });
      }

      // Check if user is active (Optional: Agar aapne model mein isActive rakha hai)
      if (req.user.isActive === false) {
        return res.status(401).json({
          success: false,
          message: 'Your account is deactivated. Please contact admin.',
        });
      }

      next();
    } catch (error) {
      console.error('JWT Verification Error:', error.message);
      return res.status(401).json({
        success: false,
        message: 'Not authorized, token failed',
      });
    }
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized, no token provided',
    });
  }
};

/**
 * Admin only middleware
 */
export const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({
      success: false,
      message: 'Access denied: Admins only',
    });
  }
};

/**
 * Optional auth
 */
export const optionalAuth = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
    } catch (error) {
      req.user = null;
    }
  }

  next();
};