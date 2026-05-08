// import mongoose from 'mongoose';
// import bcrypt from 'bcryptjs';

// const userSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: [true, 'Name is required'],
//     trim: true
//   },
//   email: {
//     type: String,
//     required: [true, 'Email is required'],
//     unique: true,
//     lowercase: true,
//     trim: true
//   },
//   phone: {
//     type: String,
//     required: [true, 'Phone number is required'],
//     trim: true
//   },
//   password: {
//     type: String,
//     required: [true, 'Password is required'],
//     minlength: 6
//   },
//   role: {
//     type: String,
//     enum: ['user', 'admin'],
//     default: 'user'
//   }
// }, {
//   timestamps: true
// });

// userSchema.pre('save', async function() {
//   if (!this.isModified('password')) {
//     return;
//   }
  
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
// });

// userSchema.methods.comparePassword = async function(enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };

// export default mongoose.model('User', userSchema);


// backend/models/User.js
// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');

// const userSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: [true, 'Please provide a name'],
//       trim: true,
//       maxlength: [50, 'Name cannot be more than 50 characters'],
//     },
//     email: {
//       type: String,
//       required: [true, 'Please provide an email'],
//       unique: true,
//       lowercase: true,
//       trim: true,
//       match: [
//         /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
//         'Please provide a valid email',
//       ],
//     },
//     password: {
//       type: String,
//       // Not required because Google users don't have password
//       minlength: [6, 'Password must be at least 6 characters'],
//       select: false, // Don't return password in queries by default
//     },
//     role: {
//       type: String,
//       enum: ['user', 'admin'],
//       default: 'user',
//     },
//     // Google OAuth fields
//     googleId: {
//       type: String,
//       unique: true,
//       sparse: true, // Allows null values with unique constraint
//     },
//     profilePicture: {
//       type: String,
//       default: null,
//     },
//     // Additional fields
//     phone: {
//       type: String,
//       default: null,
//     },
//     address: {
//       type: String,
//       default: null,
//     },
//     // Account status
//     isActive: {
//       type: Boolean,
//       default: true,
//     },
//     isEmailVerified: {
//       type: Boolean,
//       default: false,
//     },
//     // Last login tracking
//     lastLogin: {
//       type: Date,
//       default: null,
//     },
//   },
//   {
//     timestamps: true, // Adds createdAt and updatedAt
//   }
// );

// // ========================================
// // MIDDLEWARE
// // ========================================

// // Hash password before saving (only if password is modified)
// userSchema.pre('save', async function (next) {
//   // Only hash if password is present and modified
//   if (!this.isModified('password') || !this.password) {
//     return next();
//   }

//   try {
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
//   } catch (error) {
//     next(error);
//   }
// });

// // Update lastLogin on successful login
// userSchema.pre('save', function (next) {
//   if (this.isNew || this.isModified('password')) {
//     // Don't update lastLogin on registration or password change
//     return next();
//   }
//   next();
// });

// // ========================================
// // METHODS
// // ========================================

// // Compare password for login
// userSchema.methods.comparePassword = async function (candidatePassword) {
//   if (!this.password) {
//     // User registered with Google - no password
//     return false;
//   }
//   return await bcrypt.compare(candidatePassword, this.password);
// };

// // Get user without sensitive data
// userSchema.methods.toJSON = function () {
//   const user = this.toObject();
//   delete user.password;
//   delete user.__v;
//   return user;
// };

// // Check if user is admin
// userSchema.methods.isAdmin = function () {
//   return this.role === 'admin';
// };

// // ========================================
// // STATIC METHODS
// // ========================================

// // Find user by email (case-insensitive)
// userSchema.statics.findByEmail = async function (email) {
//   return await this.findOne({ email: email.toLowerCase() });
// };

// // Find user by Google ID
// userSchema.statics.findByGoogleId = async function (googleId) {
//   return await this.findOne({ googleId });
// };

// // Get all active users
// userSchema.statics.getActiveUsers = async function () {
//   return await this.find({ isActive: true });
// };

// // ========================================
// // INDEXES
// // ========================================

// // Index for faster email queries
// userSchema.index({ email: 1 });

// // Index for Google ID queries
// userSchema.index({ googleId: 1 });

// // Index for role-based queries
// userSchema.index({ role: 1 });

// // Compound index for active users
// userSchema.index({ isActive: 1, role: 1 });

// // ========================================
// // VIRTUAL PROPERTIES
// // ========================================

// // Full name virtual (if you want to split first/last name later)
// userSchema.virtual('displayName').get(function () {
//   return this.name;
// });

// // Check if user has set password
// userSchema.virtual('hasPassword').get(function () {
//   return !!this.password;
// });

// // Check if user is Google user
// userSchema.virtual('isGoogleUser').get(function () {
//   return !!this.googleId;
// });

// // ========================================
// // EXPORT MODEL
// // ========================================

// const User = mongoose.model('User', userSchema);

// module.exports = User;


// import mongoose from 'mongoose';
// import bcrypt from 'bcryptjs';

// const userSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: [true, 'Please provide a name'],
//       trim: true,
//       maxlength: [50, 'Name cannot be more than 50 characters'],
//     },
//     email: {
//       type: String,
//       required: [true, 'Please provide an email'],
//       unique: true,
//       lowercase: true,
//       trim: true,
//       match: [
//         /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
//         'Please provide a valid email',
//       ],
//     },
//     password: {
//       type: String,
//       minlength: [6, 'Password must be at least 6 characters'],
//       select: false,
//     },
//     role: {
//       type: String,
//       enum: ['user', 'admin'],
//       default: 'user',
//     },
//     googleId: {
//       type: String,
//       unique: true,
//       sparse: true,
//     },
//     profilePicture: {
//       type: String,
//       default: null,
//     },
//     phone: {
//       type: String,
//       default: null,
//     },
//     address: {
//       type: String,
//       default: null,
//     },
//     isActive: {
//       type: Boolean,
//       default: true,
//     },
//     isEmailVerified: {
//       type: Boolean,
//       default: false,
//     },
//     lastLogin: {
//       type: Date,
//       default: null,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// // ========================================
// // MIDDLEWARE
// // ========================================

// userSchema.pre('save', async function (next) {
//   if (!this.isModified('password') || !this.password) {
//     return next();
//   }

//   try {
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
//   } catch (error) {
//     next(error);
//   }
// });

// // ========================================
// // METHODS
// // ========================================

// userSchema.methods.comparePassword = async function (candidatePassword) {
//   if (!this.password) {
//     return false;
//   }
//   return await bcrypt.compare(candidatePassword, this.password);
// };

// userSchema.methods.toJSON = function () {
//   const user = this.toObject();
//   delete user.password;
//   delete user.__v;
//   return user;
// };

// userSchema.methods.isAdmin = function () {
//   return this.role === 'admin';
// };

// // ========================================
// // STATIC METHODS
// // ========================================

// userSchema.statics.findByEmail = async function (email) {
//   return await this.findOne({ email: email.toLowerCase() });
// };

// userSchema.statics.findByGoogleId = async function (googleId) {
//   return await this.findOne({ googleId });
// };

// userSchema.statics.getActiveUsers = async function () {
//   return await this.find({ isActive: true });
// };

// // ========================================
// // INDEXES
// // ========================================

// userSchema.index({ email: 1 });
// userSchema.index({ googleId: 1 });
// userSchema.index({ role: 1 });
// userSchema.index({ isActive: 1, role: 1 });

// // ========================================
// // VIRTUALS
// // ========================================

// userSchema.virtual('displayName').get(function () {
//   return this.name;
// });

// userSchema.virtual('hasPassword').get(function () {
//   return !!this.password;
// });

// userSchema.virtual('isGoogleUser').get(function () {
//   return !!this.googleId;
// });

// // ========================================
// // EXPORT MODEL
// // ========================================

// const User = mongoose.model('User', userSchema);

// export default User;

// import mongoose from 'mongoose';
// import bcrypt from 'bcryptjs';

// const userSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: [true, 'Name is required'],
//     trim: true
//   },
//   email: {
//     type: String,
//     required: [true, 'Email is required'],
//     unique: true,
//     lowercase: true,
//     trim: true
//   },
//   phone: {
//     type: String,
//     required: [true, 'Phone number is required'],
//     trim: true
//   },
//   password: {
//     type: String,
//     required: [true, 'Password is required'],
//     minlength: 6
//   },
//   role: {
//     type: String,
//     enum: ['user', 'admin'],
//     default: 'user'
//   },
//   // Google OAuth fields
//   googleId: {
//     type: String,
//     sparse: true,
//     unique: true
//   },
//   authProvider: {
//     type: String,
//     enum: ['local', 'google'],
//     default: 'local'
//   },
//   // Password reset fields
//   resetPasswordToken: {
//     type: String
//   },
//   resetPasswordExpires: {
//     type: Date
//   }
// }, {
//   timestamps: true
// });

// // Hash password before saving
// userSchema.pre('save', async function(next) {
//   if (!this.isModified('password')) {
//     return next();
//   }
  
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// });

// // Compare password method
// userSchema.methods.comparePassword = async function(enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };

// export default mongoose.model('User', userSchema);



import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 6
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  // Google OAuth fields
  googleId: {
    type: String,
    sparse: true,
    unique: true
  },
  authProvider: {
    type: String,
    enum: ['local', 'google'],
    default: 'local'
  },
  // Password reset fields - UPDATED
  resetPasswordOTP: {
    type: String
  },
  resetPasswordExpires: {
    type: Date
  },
  resetPasswordToken: {
    type: String
  }
}, {
  timestamps: true
});

// Hash password before saving
// userSchema.pre('save', async function(next) {
//   if (!this.isModified('password')) {
//     return next();
//   }
  
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// });
// Hash password before saving
userSchema.pre('save', async function() { // Removed 'next' here
  if (!this.isModified('password')) {
    return; // Just return instead of calling next()
  }
  
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  // No next() call needed for async hooks
});

// Compare password method
userSchema.methods.comparePassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model('User', userSchema);