// import jwt from 'jsonwebtoken';
// import User from '../models/User.js';


// const generateToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET, {
//     expiresIn: '30d'
//   });
// };

// export const registerUser = async (req, res) => {
//   try {
//     const { name, email, phone, password } = req.body;

//     const userExists = await User.findOne({ email });
//     if (userExists) {
//       return res.status(400).json({ message: 'User already exists' });
//     }

//     const user = await User.create({
//       name,
//       email,
//       phone,
//       password
//     });

//     if (user) {
//       res.status(201).json({
//         _id: user._id,
//         name: user.name,
//         email: user.email,
//         phone: user.phone,
//         role: user.role,
//         token: generateToken(user._id)
//       });
//     }
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// export const loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;

    
//     const user = await User.findOne({ email });

//     if (user && (await user.comparePassword(password))) {
//       res.json({
//         _id: user._id,
//         name: user.name,
//         email: user.email,
//         phone: user.phone,
//         role: user.role,
//         token: generateToken(user._id)
//       });
//     } else {
//       res.status(401).json({ message: 'Invalid email or password' });
//     }
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// export const getUserProfile = async (req, res) => {
//   try {
//     const user = await User.findById(req.user._id).select('-password');
//     res.json(user);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // backend/controllers/authController.js
// import User from '../models/User.js';
// import jwt from 'jsonwebtoken';
// import otpStore from '../utils/otpStore.js';
// import { sendOTPEmail, sendWelcomeEmail } from '../utils/emailService.js';

// /**
//  * Generate JWT token
//  */
// const generateToken = (userId, role) => {
//   return jwt.sign(
//     { id: userId, role },
//     process.env.JWT_SECRET,
//     { expiresIn: process.env.JWT_EXPIRE || '7d' }
//   );
// };

// /**
//  * Register new user
//  * POST /api/auth/register
//  */
// export const register = async (req, res) => {
//   try {
//     const { name, email, password, role } = req.body;

//     if (!name || !email || !password) {
//       return res.status(400).json({
//         success: false,
//         message: 'Please provide name, email and password',
//       });
//     }

//     const existingUser = await User.findOne({ email: email.toLowerCase() });
//     if (existingUser) {
//       return res.status(400).json({
//         success: false,
//         message: 'User with this email already exists',
//       });
//     }

//     const user = await User.create({
//       name,
//       email: email.toLowerCase(),
//       password,
//       role: role || 'user',
//     });

//     const token = generateToken(user._id, user.role);

//     sendWelcomeEmail(user.email, user.name).catch(err => 
//       console.error('Welcome email error:', err)
//     );

//     res.status(201).json({
//       success: true,
//       message: 'User registered successfully',
//       token,
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       role: user.role,
//     });
//   } catch (error) {
//     console.error('Register error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Registration failed',
//       error: error.message,
//     });
//   }
// };

// /**
//  * Login user
//  * POST /api/auth/login
//  */
// export const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       return res.status(400).json({
//         success: false,
//         message: 'Please provide email and password',
//       });
//     }

//     const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
//     if (!user) {
//       return res.status(401).json({
//         success: false,
//         message: 'Invalid email or password',
//       });
//     }

//     if (!user.password) {
//       return res.status(401).json({
//         success: false,
//         message: 'This account uses Google login. Please sign in with Google.',
//       });
//     }

//     const isPasswordMatch = await user.comparePassword(password);
//     if (!isPasswordMatch) {
//       return res.status(401).json({
//         success: false,
//         message: 'Invalid email or password',
//       });
//     }

//     const token = generateToken(user._id, user.role);

//     res.status(200).json({
//       success: true,
//       message: 'Login successful',
//       token,
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       role: user.role,
//       profilePicture: user.profilePicture,
//     });
//   } catch (error) {
//     console.error('Login error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Login failed',
//       error: error.message,
//     });
//   }
// };

// /**
//  * Google OAuth callback
//  */
// export const googleCallback = async (req, res) => {
//   try {
//     const user = req.user;
//     if (!user) {
//       return res.redirect(`${process.env.FRONTEND_URL}/login?error=authentication_failed`);
//     }

//     const token = generateToken(user._id, user.role);
//     const userData = {
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       role: user.role,
//       profilePicture: user.profilePicture,
//     };

//     const redirectUrl = `${process.env.FRONTEND_URL}/auth/google/callback?token=${token}&user=${encodeURIComponent(JSON.stringify(userData))}`;
//     res.redirect(redirectUrl);
//   } catch (error) {
//     console.error('Google callback error:', error);
//     res.redirect(`${process.env.FRONTEND_URL}/login?error=authentication_failed`);
//   }
// };

// /**
//  * Forgot Password
//  */
// export const forgotPassword = async (req, res) => {
//   try {
//     const { email } = req.body;
//     if (!email) {
//       return res.status(400).json({ success: false, message: 'Please provide email' });
//     }

//     const normalizedEmail = email.toLowerCase().trim();
//     const blockStatus = otpStore.isBlocked(normalizedEmail);
//     if (blockStatus.blocked) {
//       return res.status(429).json({ success: false, message: blockStatus.message });
//     }

//     const user = await User.findOne({ email: normalizedEmail });
//     if (!user) {
//       return res.status(200).json({ success: true, message: 'If the email exists, an OTP has been sent' });
//     }

//     const otp = otpStore.generateOTP(6);
//     const expiryMinutes = parseInt(process.env.OTP_EXPIRE_MINUTES) || 5;

//     otpStore.set(normalizedEmail, otp, expiryMinutes);
//     await sendOTPEmail(normalizedEmail, otp);

//     res.status(200).json({ success: true, message: 'OTP has been sent to your email' });
//   } catch (error) {
//     res.status(500).json({ success: false, message: 'Failed to send OTP' });
//   }
// };

// /**
//  * Verify OTP
//  */
// export const verifyOTP = async (req, res) => {
//   try {
//     const { email, otp } = req.body;
//     const result = otpStore.verify(email.toLowerCase().trim(), otp);

//     if (!result.success) {
//       return res.status(400).json({ success: false, message: result.message });
//     }

//     res.status(200).json({ success: true, message: 'OTP verified successfully' });
//   } catch (error) {
//     res.status(500).json({ success: false, message: 'Verification failed' });
//   }
// };

// /**
//  * Reset Password
//  */
// export const resetPassword = async (req, res) => {
//   try {
//     const { email, otp, newPassword } = req.body;
//     const normalizedEmail = email.toLowerCase().trim();

//     const result = otpStore.verify(normalizedEmail, otp);
//     if (!result.success) {
//       return res.status(400).json({ success: false, message: result.message });
//     }

//     const user = await User.findOne({ email: normalizedEmail });
//     user.password = newPassword;
//     await user.save();

//     otpStore.delete(normalizedEmail);

//     res.status(200).json({ success: true, message: 'Password reset successful' });
//   } catch (error) {
//     res.status(500).json({ success: false, message: 'Reset failed' });
//   }
// };

// /**
//  * Get Me
//  */
// export const getCurrentUser = async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id).select('-password');
//     res.status(200).json({ success: true, user });
//   } catch (error) {
//     res.status(500).json({ success: false, message: 'Failed to get user' });
//   }
// };

// /**
//  * Logout
//  */
// export const logout = async (req, res) => {
//   res.status(200).json({ success: true, message: 'Logout successful' });
// };

// /**
//  * OTP Stats
//  */
// export const getOTPStats = async (req, res) => {
//   res.status(200).json({ success: true, stats: otpStore.getStats() });
// };

// import jwt from 'jsonwebtoken';
// import User from '../models/User.js';
// import otpStore from '../utils/otpStore.js';
// import { sendOTPEmail } from '../utils/emailService.js';

// const generateToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET, {
//     expiresIn: '30d'
//   });
// };

// // Register User
// export const registerUser = async (req, res) => {
//   try {
//     const { name, email, phone, password } = req.body;
//     const userExists = await User.findOne({ email });
//     if (userExists) {
//       return res.status(400).json({ message: 'User already exists' });
//     }
//     const user = await User.create({
//       name,
//       email,
//       phone,
//       password
//     });
//     if (user) {
//       res.status(201).json({
//         _id: user._id,
//         name: user.name,
//         email: user.email,
//         phone: user.phone,
//         role: user.role,
//         token: generateToken(user._id)
//       });
//     }
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Login User
// export const loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;
    
//     const user = await User.findOne({ email });
//     if (user && (await user.comparePassword(password))) {
//       res.json({
//         _id: user._id,
//         name: user.name,
//         email: user.email,
//         phone: user.phone,
//         role: user.role,
//         token: generateToken(user._id)
//       });
//     } else {
//       res.status(401).json({ message: 'Invalid email or password' });
//     }
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Get User Profile
// export const getUserProfile = async (req, res) => {
//   try {
//     const user = await User.findById(req.user._id).select('-password');
//     res.json(user);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // ============================================
// // FORGOT PASSWORD FLOW
// // ============================================

// // Step 1: Request OTP
// export const forgotPassword = async (req, res) => {
//   try {
//     const { email } = req.body;

//     if (!email) {
//       return res.status(400).json({ message: 'Email is required' });
//     }

//     // Check if email is blocked
//     const blockStatus = otpStore.isBlocked(email);
//     if (blockStatus.blocked) {
//       return res.status(429).json({ 
//         message: `Too many attempts. ${blockStatus.message}`,
//         remainingMinutes: blockStatus.remainingMinutes 
//       });
//     }

//     // Check if user exists
//     const user = await User.findOne({ email: email.toLowerCase().trim() });
//     if (!user) {
//       return res.status(404).json({ message: 'No account found with this email' });
//     }

//     // Generate OTP
//     const otp = otpStore.generateOTP(6);
//     otpStore.set(email, otp, 5); // 5 minutes expiry

//     // Send OTP email
//     await sendOTPEmail(email, otp);

//     res.status(200).json({
//       message: 'OTP sent successfully to your email',
//       email: email.toLowerCase().trim(),
//       expiresIn: '5 minutes'
//     });

//   } catch (error) {
//     console.error('Forgot Password Error:', error);
//     res.status(500).json({ message: 'Failed to send OTP. Please try again.' });
//   }
// };

// // Step 2: Verify OTP
// export const verifyOTP = async (req, res) => {
//   try {
//     const { email, otp } = req.body;

//     if (!email || !otp) {
//       return res.status(400).json({ message: 'Email and OTP are required' });
//     }

//     // Verify OTP
//     const verification = otpStore.verify(email, otp);

//     if (!verification.success) {
//       return res.status(400).json({ 
//         message: verification.message,
//         code: verification.code,
//         attemptsLeft: verification.attemptsLeft
//       });
//     }

//     // OTP verified successfully
//     res.status(200).json({
//       message: 'OTP verified successfully',
//       email: email.toLowerCase().trim(),
//       verified: true
//     });

//   } catch (error) {
//     console.error('Verify OTP Error:', error);
//     res.status(500).json({ message: 'OTP verification failed' });
//   }
// };

// // Step 3: Reset Password
// export const resetPassword = async (req, res) => {
//   try {
//     const { email, otp, newPassword } = req.body;

//     if (!email || !otp || !newPassword) {
//       return res.status(400).json({ message: 'Email, OTP, and new password are required' });
//     }

//     if (newPassword.length < 6) {
//       return res.status(400).json({ message: 'Password must be at least 6 characters' });
//     }

//     // Verify OTP one last time
//     const verification = otpStore.verify(email, otp);
//     if (!verification.success) {
//       return res.status(400).json({ message: 'Invalid or expired OTP' });
//     }

//     // Find user and update password
//     const user = await User.findOne({ email: email.toLowerCase().trim() });
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     // Update password
//     user.password = newPassword;
//     await user.save();

//     // Delete OTP after successful reset
//     otpStore.delete(email);

//     res.status(200).json({
//       message: 'Password reset successfully',
//       success: true
//     });

//   } catch (error) {
//     console.error('Reset Password Error:', error);
//     res.status(500).json({ message: 'Failed to reset password' });
//   }
// };

// // ============================================
// // GOOGLE OAUTH HANDLERS
// // ============================================

// // Google OAuth Success Handler
// export const googleAuthSuccess = (req, res) => {
//   try {
//     const token = generateToken(req.user._id);
//     const userData = {
//       _id: req.user._id,
//       name: req.user.name,
//       email: req.user.email,
//       phone: req.user.phone,
//       role: req.user.role
//     };

//     // Redirect to frontend with token and user data
//     const frontendURL = process.env.FRONTEND_URL || 'http://localhost:5173';
//     res.redirect(`${frontendURL}/google-callback?token=${token}&user=${encodeURIComponent(JSON.stringify(userData))}`);
//   } catch (error) {
//     console.error('Google Auth Success Error:', error);
//     const frontendURL = process.env.FRONTEND_URL || 'http://localhost:5173';
//     res.redirect(`${frontendURL}/login?error=auth_failed`);
//   }
// };

// // Google OAuth Failure Handler
// export const googleAuthFailure = (req, res) => {
//   const frontendURL = process.env.FRONTEND_URL || 'http://localhost:5173';
//   res.redirect(`${frontendURL}/login?error=google_auth_failed`);
// };


import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import otpStore from '../utils/otpStore.js';
import { sendOTPEmail } from '../utils/emailService.js';

// ============================================
// UTILITIES
// ============================================

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
};

// ============================================
// CORE AUTHENTICATION
// ============================================

export const registerUser = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;
    const emailKey = email.toLowerCase().trim();

    const userExists = await User.findOne({ email: emailKey });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({
      name,
      email: emailKey,
      phone,
      password,
      authProvider: 'local'
    });

    res.status(201).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      token: generateToken(user._id)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const emailKey = email.toLowerCase().trim();

    const user = await User.findOne({ email: emailKey });
    if (user && (await user.comparePassword(password))) {
      res.json({
        success: true,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role
        },
        token: generateToken(user._id)
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ============================================
// FORGOT PASSWORD FLOW (OTP BASED)
// ============================================

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: 'Email is required' });

    const emailKey = email.toLowerCase().trim();

    // Rate limiting check
    const blockStatus = otpStore.isBlocked(emailKey);
    if (blockStatus.blocked) {
      return res.status(429).json({ 
        message: `Too many attempts. ${blockStatus.message}`,
        remainingMinutes: blockStatus.remainingMinutes 
      });
    }

    const user = await User.findOne({ email: emailKey });
    if (!user) return res.status(404).json({ message: 'No account found with this email' });

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otpStore.set(emailKey, otp, 5); // 5 minute expiry

    await sendOTPEmail(emailKey, otp, user.name);

    res.status(200).json({
      success: true,
      message: 'OTP sent successfully to your email',
      email: emailKey
    });
  } catch (error) {
    console.error('Forgot Password Error:', error);
    res.status(500).json({ message: 'Failed to send OTP email' });
  }
};

export const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) return res.status(400).json({ message: 'Email and OTP are required' });

    const emailKey = email.toLowerCase().trim();
    const verification = otpStore.verify(emailKey, otp);

    if (!verification.success) {
      return res.status(400).json({ 
        message: verification.message,
        attemptsLeft: verification.attemptsLeft
      });
    }

    res.status(200).json({
      success: true,
      message: 'OTP verified successfully',
      email: emailKey,
      verified: true
    });
  } catch (error) {
    res.status(500).json({ message: 'OTP verification failed' });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    const emailKey = email.toLowerCase().trim();

    if (!email || !otp || !newPassword) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Security check: Verify OTP again before allowing password change
    const verification = otpStore.verify(emailKey, otp);
    if (!verification.success) {
      return res.status(400).json({ message: 'Session expired or invalid OTP. Please restart process.' });
    }

    const user = await User.findOne({ email: emailKey });
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Update password - plain text here because UserSchema.pre('save') hashes it
    user.password = newPassword;
    await user.save();

    // Clean up OTP store
    otpStore.delete(emailKey);

    res.status(200).json({
      success: true,
      message: 'Password reset successfully'
    });
  } catch (error) {
    console.error('Reset Password Error:', error);
    res.status(500).json({ message: 'Failed to reset password' });
  }
};

// ============================================
// GOOGLE OAUTH HANDLERS
// ============================================

export const googleAuthSuccess = (req, res) => {
  try {
    const token = generateToken(req.user._id);
    const userData = {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role
    };

    const frontendURL = process.env.FRONTEND_URL || 'http://localhost:5173';
    // Redirect with token and user data in URL params
    res.redirect(`${frontendURL}/google-callback?token=${token}&user=${encodeURIComponent(JSON.stringify(userData))}`);
  } catch (error) {
    console.error('Google Auth Success Error:', error);
    res.redirect(`${process.env.FRONTEND_URL}/login?error=auth_failed`);
  }
};

export const googleAuthFailure = (req, res) => {
  const frontendURL = process.env.FRONTEND_URL || 'http://localhost:5173';
  res.redirect(`${frontendURL}/login?error=google_auth_failed`);
};