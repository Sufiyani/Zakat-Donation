// // backend/utils/otpStore.js
// const crypto = require('crypto');

// /**
//  * In-memory OTP storage
//  * For production, use Redis or database with TTL
//  */
// class OTPStore {
//   constructor() {
//     this.otps = new Map();
//     this.attempts = new Map(); // Track failed attempts
//     this.cleanupInterval = setInterval(() => this.cleanup(), 60000); // Cleanup every minute
//   }

//   /**
//    * Generate a random OTP
//    * @param {number} length - Length of OTP (default: 6)
//    * @returns {string} - Generated OTP
//    */
//   generateOTP(length = 6) {
//     const otp = crypto.randomInt(Math.pow(10, length - 1), Math.pow(10, length)).toString();
//     return otp;
//   }

//   /**
//    * Store OTP for an email
//    * @param {string} email - User's email address
//    * @param {string} otp - Generated OTP
//    * @param {number} expiryMinutes - Expiry time in minutes (default: 5)
//    */
//   set(email, otp, expiryMinutes = 5) {
//     const normalizedEmail = email.toLowerCase().trim();
//     const expiresAt = Date.now() + expiryMinutes * 60 * 1000;

//     this.otps.set(normalizedEmail, {
//       otp,
//       expiresAt,
//       createdAt: Date.now(),
//       attempts: 0,
//     });

//     // Reset failed attempts counter
//     this.attempts.delete(normalizedEmail);

//     console.log(`✅ OTP stored for ${normalizedEmail}, expires at ${new Date(expiresAt).toLocaleTimeString()}`);
//   }

//   /**
//    * Verify OTP for an email
//    * @param {string} email - User's email address
//    * @param {string} otp - OTP to verify
//    * @returns {Object} - Verification result
//    */
//   verify(email, otp) {
//     const normalizedEmail = email.toLowerCase().trim();
//     const stored = this.otps.get(normalizedEmail);

//     // Check if OTP exists
//     if (!stored) {
//       return {
//         success: false,
//         message: 'OTP not found or expired',
//         code: 'OTP_NOT_FOUND',
//       };
//     }

//     // Check if OTP has expired
//     if (Date.now() > stored.expiresAt) {
//       this.otps.delete(normalizedEmail);
//       return {
//         success: false,
//         message: 'OTP has expired',
//         code: 'OTP_EXPIRED',
//       };
//     }

//     // Increment attempt counter
//     stored.attempts += 1;

//     // Check max attempts (prevent brute force)
//     const maxAttempts = 5;
//     if (stored.attempts > maxAttempts) {
//       this.otps.delete(normalizedEmail);
//       this.blockEmail(normalizedEmail, 15); // Block for 15 minutes
//       return {
//         success: false,
//         message: 'Too many failed attempts. Please request a new OTP.',
//         code: 'MAX_ATTEMPTS_EXCEEDED',
//       };
//     }

//     // Verify OTP
//     if (stored.otp === otp) {
//       // OTP is correct - keep it for password reset
//       // Don't delete yet, will be deleted after password reset
//       console.log(`✅ OTP verified successfully for ${normalizedEmail}`);
//       return {
//         success: true,
//         message: 'OTP verified successfully',
//         code: 'SUCCESS',
//       };
//     } else {
//       const attemptsLeft = maxAttempts - stored.attempts;
//       console.log(`❌ Invalid OTP for ${normalizedEmail}. Attempts left: ${attemptsLeft}`);
//       return {
//         success: false,
//         message: `Invalid OTP. ${attemptsLeft} attempts remaining.`,
//         code: 'INVALID_OTP',
//         attemptsLeft,
//       };
//     }
//   }

//   /**
//    * Check if OTP is still valid (without incrementing attempts)
//    * @param {string} email - User's email address
//    * @returns {boolean} - True if valid OTP exists
//    */
//   has(email) {
//     const normalizedEmail = email.toLowerCase().trim();
//     const stored = this.otps.get(normalizedEmail);

//     if (!stored) return false;
//     if (Date.now() > stored.expiresAt) {
//       this.otps.delete(normalizedEmail);
//       return false;
//     }

//     return true;
//   }

//   /**
//    * Delete OTP after successful password reset
//    * @param {string} email - User's email address
//    */
//   delete(email) {
//     const normalizedEmail = email.toLowerCase().trim();
//     this.otps.delete(normalizedEmail);
//     this.attempts.delete(normalizedEmail);
//     console.log(`🗑️ OTP deleted for ${normalizedEmail}`);
//   }

//   /**
//    * Block email temporarily after too many failed attempts
//    * @param {string} email - Email to block
//    * @param {number} minutes - Block duration in minutes
//    */
//   blockEmail(email, minutes = 15) {
//     const normalizedEmail = email.toLowerCase().trim();
//     const unblockAt = Date.now() + minutes * 60 * 1000;

//     this.attempts.set(normalizedEmail, {
//       blocked: true,
//       unblockAt,
//     });

//     console.log(`🚫 Email ${normalizedEmail} blocked until ${new Date(unblockAt).toLocaleTimeString()}`);
//   }

//   /**
//    * Check if email is blocked
//    * @param {string} email - Email to check
//    * @returns {Object} - Block status
//    */
//   isBlocked(email) {
//     const normalizedEmail = email.toLowerCase().trim();
//     const attempt = this.attempts.get(normalizedEmail);

//     if (!attempt || !attempt.blocked) {
//       return { blocked: false };
//     }

//     // Check if block has expired
//     if (Date.now() > attempt.unblockAt) {
//       this.attempts.delete(normalizedEmail);
//       return { blocked: false };
//     }

//     const remainingMinutes = Math.ceil((attempt.unblockAt - Date.now()) / 60000);
//     return {
//       blocked: true,
//       remainingMinutes,
//       message: `Too many attempts. Please try again in ${remainingMinutes} minutes.`,
//     };
//   }

//   /**
//    * Get OTP info (for debugging)
//    * @param {string} email - User's email address
//    * @returns {Object|null} - OTP info or null
//    */
//   get(email) {
//     const normalizedEmail = email.toLowerCase().trim();
//     return this.otps.get(normalizedEmail) || null;
//   }

//   /**
//    * Clean up expired OTPs
//    */
//   cleanup() {
//     const now = Date.now();
//     let cleaned = 0;

//     // Cleanup expired OTPs
//     for (const [email, data] of this.otps.entries()) {
//       if (now > data.expiresAt) {
//         this.otps.delete(email);
//         cleaned++;
//       }
//     }

//     // Cleanup expired blocks
//     for (const [email, data] of this.attempts.entries()) {
//       if (data.blocked && now > data.unblockAt) {
//         this.attempts.delete(email);
//       }
//     }

//     if (cleaned > 0) {
//       console.log(`🧹 Cleaned up ${cleaned} expired OTP(s)`);
//     }
//   }

//   /**
//    * Get statistics
//    * @returns {Object} - Store statistics
//    */
//   getStats() {
//     return {
//       totalOTPs: this.otps.size,
//       blockedEmails: Array.from(this.attempts.values()).filter(a => a.blocked).length,
//       activeOTPs: Array.from(this.otps.values()).filter(
//         data => Date.now() <= data.expiresAt
//       ).length,
//     };
//   }

//   /**
//    * Clear all OTPs (for testing)
//    */
//   clear() {
//     this.otps.clear();
//     this.attempts.clear();
//     console.log('🧹 All OTPs cleared');
//   }

//   /**
//    * Cleanup interval on shutdown
//    */
//   destroy() {
//     if (this.cleanupInterval) {
//       clearInterval(this.cleanupInterval);
//       console.log('🛑 OTP store cleanup interval stopped');
//     }
//   }
// }

// // Create singleton instance
// const otpStore = new OTPStore();

// // Graceful shutdown
// process.on('SIGINT', () => {
//   otpStore.destroy();
// });

// process.on('SIGTERM', () => {
//   otpStore.destroy();
// });

// module.exports = otpStore;


import crypto from 'crypto';

/**
 * In-memory OTP storage
 * For production, use Redis or database with TTL
 */
class OTPStore {
  constructor() {
    this.otps = new Map();
    this.attempts = new Map(); // Track failed attempts
    this.cleanupInterval = setInterval(() => this.cleanup(), 60000); // Cleanup every minute
  }

  /**
   * Generate a random OTP
   */
  generateOTP(length = 6) {
    const otp = crypto.randomInt(Math.pow(10, length - 1), Math.pow(10, length)).toString();
    return otp;
  }

  /**
   * Store OTP for an email
   */
  set(email, otp, expiryMinutes = 5) {
    const normalizedEmail = email.toLowerCase().trim();
    const expiresAt = Date.now() + expiryMinutes * 60 * 1000;

    this.otps.set(normalizedEmail, {
      otp,
      expiresAt,
      createdAt: Date.now(),
      attempts: 0,
    });

    this.attempts.delete(normalizedEmail);
    console.log(`✅ OTP stored for ${normalizedEmail}, expires at ${new Date(expiresAt).toLocaleTimeString()}`);
  }

  /**
   * Verify OTP for an email
   */
  verify(email, otp) {
    const normalizedEmail = email.toLowerCase().trim();
    const stored = this.otps.get(normalizedEmail);

    if (!stored) {
      return { success: false, message: 'OTP not found or expired', code: 'OTP_NOT_FOUND' };
    }

    if (Date.now() > stored.expiresAt) {
      this.otps.delete(normalizedEmail);
      return { success: false, message: 'OTP has expired', code: 'OTP_EXPIRED' };
    }

    stored.attempts += 1;

    const maxAttempts = 5;
    if (stored.attempts > maxAttempts) {
      this.otps.delete(normalizedEmail);
      this.blockEmail(normalizedEmail, 15);
      return { success: false, message: 'Too many failed attempts.', code: 'MAX_ATTEMPTS_EXCEEDED' };
    }

    if (stored.otp === otp) {
      console.log(`✅ OTP verified successfully for ${normalizedEmail}`);
      return { success: true, message: 'OTP verified successfully', code: 'SUCCESS' };
    } else {
      const attemptsLeft = maxAttempts - stored.attempts;
      return { success: false, message: `Invalid OTP. ${attemptsLeft} attempts left.`, code: 'INVALID_OTP', attemptsLeft };
    }
  }

  has(email) {
    const normalizedEmail = email.toLowerCase().trim();
    const stored = this.otps.get(normalizedEmail);
    if (!stored) return false;
    if (Date.now() > stored.expiresAt) {
      this.otps.delete(normalizedEmail);
      return false;
    }
    return true;
  }

  delete(email) {
    const normalizedEmail = email.toLowerCase().trim();
    this.otps.delete(normalizedEmail);
    this.attempts.delete(normalizedEmail);
    console.log(`🗑️ OTP deleted for ${normalizedEmail}`);
  }

  blockEmail(email, minutes = 15) {
    const normalizedEmail = email.toLowerCase().trim();
    const unblockAt = Date.now() + minutes * 60 * 1000;
    this.attempts.set(normalizedEmail, { blocked: true, unblockAt });
    console.log(`🚫 Email ${normalizedEmail} blocked until ${new Date(unblockAt).toLocaleTimeString()}`);
  }

  isBlocked(email) {
    const normalizedEmail = email.toLowerCase().trim();
    const attempt = this.attempts.get(normalizedEmail);
    if (!attempt || !attempt.blocked) return { blocked: false };

    if (Date.now() > attempt.unblockAt) {
      this.attempts.delete(normalizedEmail);
      return { blocked: false };
    }

    const remainingMinutes = Math.ceil((attempt.unblockAt - Date.now()) / 60000);
    return { blocked: true, remainingMinutes, message: `Try again in ${remainingMinutes} minutes.` };
  }

  get(email) {
    const normalizedEmail = email.toLowerCase().trim();
    return this.otps.get(normalizedEmail) || null;
  }

  cleanup() {
    const now = Date.now();
    for (const [email, data] of this.otps.entries()) {
      if (now > data.expiresAt) this.otps.delete(email);
    }
    for (const [email, data] of this.attempts.entries()) {
      if (data.blocked && now > data.unblockAt) this.attempts.delete(email);
    }
  }

  destroy() {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
      console.log('🛑 OTP store cleanup interval stopped');
    }
  }
}

// Create singleton instance
const otpStore = new OTPStore();

// Graceful shutdown
const handleShutdown = () => {
  otpStore.destroy();
};

process.on('SIGINT', handleShutdown);
process.on('SIGTERM', handleShutdown);

export default otpStore;