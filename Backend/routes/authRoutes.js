// // import express from 'express';
// // import { registerUser, loginUser, getUserProfile } from '../controllers/authController.js';
// // import { protect } from '../middleware/auth.js';

// // const router = express.Router();

// // router.post('/register', registerUser);
// // router.post('/login', loginUser);
// // router.get('/profile', protect, getUserProfile);

// // export default router;


// // backend/routes/authRoutes.js
// const express = require('express');
// const router = express.Router();
// const passport = require('passport');
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const nodemailer = require('nodemailer');
// const crypto = require('crypto');
// const User = require('../models/User');
// const jwt = require('jsonwebtoken');

// // Configure email transporter (use your email service)
// const transporter = nodemailer.createTransport({
//   service: 'gmail', // or your email service
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASSWORD,
//   },
// });

// // Store OTPs temporarily (in production, use Redis or database)
// const otpStore = new Map();

// // Configure Google OAuth Strategy
// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       callbackURL: '/api/auth/google/callback',
//     },
//     async (accessToken, refreshToken, profile, done) => {
//       try {
//         // Find or create user
//         let user = await User.findOne({ googleId: profile.id });
        
//         if (!user) {
//           user = await User.findOne({ email: profile.emails[0].value });
          
//           if (user) {
//             // Link Google account to existing user
//             user.googleId = profile.id;
//             await user.save();
//           } else {
//             // Create new user
//             user = await User.create({
//               googleId: profile.id,
//               email: profile.emails[0].value,
//               name: profile.displayName,
//               profilePicture: profile.photos[0]?.value,
//               role: 'user',
//             });
//           }
//         }
        
//         return done(null, user);
//       } catch (error) {
//         return done(error, null);
//       }
//     }
//   )
// );

// // Standard login route
// router.post('/login', async (req, res) => {
//   try {
//     const { email, password } = req.body;
    
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(401).json({ message: 'Invalid credentials' });
//     }
    
//     const isMatch = await user.comparePassword(password);
//     if (!isMatch) {
//       return res.status(401).json({ message: 'Invalid credentials' });
//     }
    
//     const token = jwt.sign(
//       { id: user._id, role: user.role },
//       process.env.JWT_SECRET,
//       { expiresIn: '7d' }
//     );
    
//     res.json({
//       token,
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       role: user.role,
//     });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// });

// // Register route
// router.post('/register', async (req, res) => {
//   try {
//     const { name, email, password } = req.body;
    
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: 'User already exists' });
//     }
    
//     const user = await User.create({ name, email, password, role: 'user' });
    
//     const token = jwt.sign(
//       { id: user._id, role: user.role },
//       process.env.JWT_SECRET,
//       { expiresIn: '7d' }
//     );
    
//     res.status(201).json({
//       token,
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       role: user.role,
//     });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// });

// // Google OAuth initiation
// router.get('/google', passport.authenticate('google', { 
//   scope: ['profile', 'email'],
//   session: false 
// }));

// // Google OAuth callback
// router.get('/google/callback',
//   passport.authenticate('google', { session: false, failureRedirect: '/login' }),
//   (req, res) => {
//     try {
//       const token = jwt.sign(
//         { id: req.user._id, role: req.user.role },
//         process.env.JWT_SECRET,
//         { expiresIn: '7d' }
//       );
      
//       // Redirect to frontend with token
//       res.redirect(`${process.env.FRONTEND_URL}/auth/callback?token=${token}&user=${encodeURIComponent(JSON.stringify({
//         _id: req.user._id,
//         name: req.user.name,
//         email: req.user.email,
//         role: req.user.role,
//       }))}`);
//     } catch (error) {
//       res.redirect(`${process.env.FRONTEND_URL}/login?error=authentication_failed`);
//     }
//   }
// );

// // Forgot Password - Send OTP
// router.post('/forgot-password', async (req, res) => {
//   try {
//     const { email } = req.body;
    
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }
    
//     // Generate 6-digit OTP
//     const otp = crypto.randomInt(100000, 999999).toString();
    
//     // Store OTP with expiration (5 minutes)
//     otpStore.set(email, {
//       otp,
//       expiresAt: Date.now() + 5 * 60 * 1000,
//     });
    
//     // Send email
//     await transporter.sendMail({
//       from: process.env.EMAIL_USER,
//       to: email,
//       subject: 'Password Reset OTP - Zakat Management',
//       html: `
//         <div style="font-family: Arial, sans-serif; padding: 20px;">
//           <h2 style="color: #059669;">Password Reset Request</h2>
//           <p>You requested to reset your password. Use the following OTP to proceed:</p>
//           <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0;">
//             <h1 style="color: #059669; letter-spacing: 8px; margin: 0;">${otp}</h1>
//           </div>
//           <p>This OTP will expire in 5 minutes.</p>
//           <p>If you didn't request this, please ignore this email.</p>
//         </div>
//       `,
//     });
    
//     res.json({ message: 'OTP sent to your email' });
//   } catch (error) {
//     console.error('Forgot password error:', error);
//     res.status(500).json({ message: 'Failed to send OTP', error: error.message });
//   }
// });

// // Verify OTP
// router.post('/verify-otp', async (req, res) => {
//   try {
//     const { email, otp } = req.body;
    
//     const storedOTP = otpStore.get(email);
    
//     if (!storedOTP) {
//       return res.status(400).json({ message: 'OTP expired or not found' });
//     }
    
//     if (Date.now() > storedOTP.expiresAt) {
//       otpStore.delete(email);
//       return res.status(400).json({ message: 'OTP expired' });
//     }
    
//     if (storedOTP.otp !== otp) {
//       return res.status(400).json({ message: 'Invalid OTP' });
//     }
    
//     res.json({ message: 'OTP verified successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'Verification failed', error: error.message });
//   }
// });

// // Reset Password
// router.post('/reset-password', async (req, res) => {
//   try {
//     const { email, otp, newPassword } = req.body;
    
//     const storedOTP = otpStore.get(email);
    
//     if (!storedOTP || storedOTP.otp !== otp || Date.now() > storedOTP.expiresAt) {
//       return res.status(400).json({ message: 'Invalid or expired OTP' });
//     }
    
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }
    
//     user.password = newPassword;
//     await user.save();
    
//     // Clear OTP
//     otpStore.delete(email);
    
//     res.json({ message: 'Password reset successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'Password reset failed', error: error.message });
//   }
// });

// module.exports = router;


// backend/routes/authRoutes.js
// import express from 'express';
// import passport from 'passport';
// import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
// import User from '../models/User.js';
// import * as authController from '../controllers/authController.js';
// import { protect, admin } from '../middleware/auth.js';

// const router = express.Router();

// // ========================================
// // CONFIGURE GOOGLE OAUTH STRATEGY
// // ========================================
// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       callbackURL: process.env.GOOGLE_CALLBACK_URL || '/api/auth/google/callback',
//     },
//     async (accessToken, refreshToken, profile, done) => {
//       try {
//         const email = profile.emails[0].value;
//         const name = profile.displayName;
//         const googleId = profile.id;
//         const profilePicture = profile.photos[0]?.value;

//         let user = await User.findOne({ googleId });

//         if (!user) {
//           user = await User.findOne({ email: email.toLowerCase() });

//           if (user) {
//             user.googleId = googleId;
//             if (!user.profilePicture) {
//               user.profilePicture = profilePicture;
//             }
//             await user.save();
//             console.log(`✅ Google account linked to: ${email}`);
//           } else {
//             user = await User.create({
//               name,
//               email: email.toLowerCase(),
//               googleId,
//               profilePicture,
//               role: 'user',
//             });
//             console.log(`✅ New user created via Google: ${email}`);
//           }
//         } else {
//           console.log(`✅ Existing Google user logged in: ${email}`);
//         }

//         return done(null, user);
//       } catch (error) {
//         console.error('Google OAuth error:', error);
//         return done(error, null);
//       }
//     }
//   )
// );

// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// passport.deserializeUser(async (id, done) => {
//   try {
//     const user = await User.findById(id);
//     done(null, user);
//   } catch (error) {
//     done(error, null);
//   }
// });

// // ========================================
// // AUTHENTICATION ROUTES
// // ========================================

// router.post('/register', authController.register);
// router.post('/login', authController.login);

// router.get(
//   '/google',
//   passport.authenticate('google', {
//     scope: ['profile', 'email'],
//     session: false,
//   })
// );

// router.get(
//   '/google/callback',
//   passport.authenticate('google', {
//     session: false,
//     failureRedirect: `${process.env.FRONTEND_URL}/login?error=google_auth_failed`,
//   }),
//   authController.googleCallback
// );

// router.post('/forgot-password', authController.forgotPassword);
// router.post('/verify-otp', authController.verifyOTP);
// router.post('/reset-password', authController.resetPassword);

// router.get('/me', protect, authController.getCurrentUser);
// router.post('/logout', protect, authController.logout);

// // Admin only
// router.get('/otp-stats', protect, admin, authController.getOTPStats);

// export default router;

import express from 'express';
import passport from 'passport';
import { 
  registerUser, 
  loginUser, 
  getUserProfile,
  forgotPassword,
  verifyOTP,
  resetPassword,
  googleAuthSuccess,
  googleAuthFailure
} from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// ============================================
// TRADITIONAL AUTH ROUTES
// ============================================
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', protect, getUserProfile);

// ============================================
// PASSWORD RESET ROUTES
// ============================================
router.post('/forgot-password', forgotPassword);
router.post('/verify-otp', verifyOTP);
router.post('/reset-password', resetPassword);

// ============================================
// GOOGLE OAUTH ROUTES
// ============================================
router.get(
  '/google',
  passport.authenticate('google', { 
    scope: ['profile', 'email'] 
  })
);

router.get(
  '/google/callback',
  passport.authenticate('google', { 
    failureRedirect: '/api/auth/google/failure',
    session: false 
  }),
  googleAuthSuccess
);

router.get('/google/failure', googleAuthFailure);

export default router;