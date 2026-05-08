// // backend/utils/emailService.js
// const nodemailer = require('nodemailer');

// // Create email transporter using Gmail
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASSWORD,
//   },
// });

// // Verify transporter configuration
// transporter.verify((error, success) => {
//   if (error) {
//     console.error('❌ Email configuration error:', error);
//   } else {
//     console.log('✅ Email service ready to send messages');
//   }
// });

// /**
//  * Send OTP email to user
//  * @param {string} email - Recipient email address
//  * @param {string} otp - 6-digit OTP code
//  * @returns {Promise} - Email send result
//  */
// const sendOTPEmail = async (email, otp) => {
//   const mailOptions = {
//     from: process.env.EMAIL_FROM || `Zakat Management <${process.env.EMAIL_USER}>`,
//     to: email,
//     subject: 'Password Reset OTP - Zakat Management System',
//     html: `
//       <!DOCTYPE html>
//       <html>
//       <head>
//         <meta charset="utf-8">
//         <meta name="viewport" content="width=device-width, initial-scale=1.0">
//         <title>Password Reset OTP</title>
//       </head>
//       <body style="margin: 0; padding: 0; font-family: 'Arial', sans-serif; background-color: #f0fdf4;">
//         <table role="presentation" style="width: 100%; border-collapse: collapse;">
//           <tr>
//             <td align="center" style="padding: 40px 0;">
//               <table role="presentation" style="width: 600px; border-collapse: collapse; background-color: #ffffff; border-radius: 16px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                
//                 <!-- Header -->
//                 <tr>
//                   <td style="padding: 40px 40px 30px; background: linear-gradient(135deg, #059669 0%, #047857 100%); border-radius: 16px 16px 0 0; text-align: center;">
//                     <div style="width: 80px; height: 80px; background-color: rgba(255, 255, 255, 0.2); border-radius: 16px; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center;">
//                       <span style="color: #ffffff; font-size: 40px;">🔐</span>
//                     </div>
//                     <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold;">Password Reset Request</h1>
//                     <p style="margin: 10px 0 0; color: rgba(255, 255, 255, 0.9); font-size: 14px;">Zakat Management System</p>
//                   </td>
//                 </tr>

//                 <!-- Body -->
//                 <tr>
//                   <td style="padding: 40px;">
//                     <p style="margin: 0 0 20px; color: #374151; font-size: 16px; line-height: 1.6;">
//                       Hello,
//                     </p>
                    
//                     <p style="margin: 0 0 30px; color: #374151; font-size: 16px; line-height: 1.6;">
//                       We received a request to reset your password. Use the following One-Time Password (OTP) to complete the process:
//                     </p>

//                     <!-- OTP Box -->
//                     <div style="background: linear-gradient(135deg, #f0fdf4 0%, #d1fae5 100%); padding: 30px; border-radius: 12px; text-align: center; margin: 30px 0; border: 2px solid #059669;">
//                       <p style="margin: 0 0 10px; color: #047857; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">Your OTP Code</p>
//                       <h2 style="margin: 0; color: #059669; font-size: 48px; font-weight: bold; letter-spacing: 12px; font-family: 'Courier New', monospace;">${otp}</h2>
//                     </div>

//                     <!-- Important Info -->
//                     <div style="background-color: #fef3c7; padding: 20px; border-radius: 8px; border-left: 4px solid #f59e0b; margin: 30px 0;">
//                       <p style="margin: 0; color: #92400e; font-size: 14px; line-height: 1.6;">
//                         ⏰ <strong>Important:</strong> This OTP will expire in <strong>5 minutes</strong>. Please use it immediately.
//                       </p>
//                     </div>

//                     <p style="margin: 30px 0 0; color: #6b7280; font-size: 14px; line-height: 1.6;">
//                       If you didn't request a password reset, please ignore this email or contact support if you have concerns.
//                     </p>
//                   </td>
//                 </tr>

//                 <!-- Footer -->
//                 <tr>
//                   <td style="padding: 30px 40px; background-color: #f9fafb; border-radius: 0 0 16px 16px; border-top: 1px solid #e5e7eb;">
//                     <p style="margin: 0 0 10px; color: #6b7280; font-size: 14px; text-align: center;">
//                       Best regards,<br>
//                       <strong style="color: #059669;">Zakat Management Team</strong>
//                     </p>
//                     <p style="margin: 20px 0 0; color: #9ca3af; font-size: 12px; text-align: center; line-height: 1.5;">
//                       This is an automated message, please do not reply to this email.<br>
//                       © ${new Date().getFullYear()} Zakat Management System. All rights reserved.
//                     </p>
//                   </td>
//                 </tr>

//               </table>
//             </td>
//           </tr>
//         </table>
//       </body>
//       </html>
//     `,
//     // Plain text version for email clients that don't support HTML
//     text: `
//       Password Reset OTP - Zakat Management System
      
//       Hello,
      
//       We received a request to reset your password.
      
//       Your OTP Code: ${otp}
      
//       This OTP will expire in 5 minutes.
      
//       If you didn't request a password reset, please ignore this email.
      
//       Best regards,
//       Zakat Management Team
//     `,
//   };

//   try {
//     const info = await transporter.sendMail(mailOptions);
//     console.log('✅ OTP Email sent successfully:', info.messageId);
//     return { success: true, messageId: info.messageId };
//   } catch (error) {
//     console.error('❌ Error sending OTP email:', error);
//     throw new Error('Failed to send OTP email');
//   }
// };

// /**
//  * Send welcome email to new user
//  * @param {string} email - Recipient email address
//  * @param {string} name - User's name
//  * @returns {Promise} - Email send result
//  */
// const sendWelcomeEmail = async (email, name) => {
//   const mailOptions = {
//     from: process.env.EMAIL_FROM || `Zakat Management <${process.env.EMAIL_USER}>`,
//     to: email,
//     subject: 'Welcome to Zakat Management System',
//     html: `
//       <!DOCTYPE html>
//       <html>
//       <head>
//         <meta charset="utf-8">
//         <title>Welcome</title>
//       </head>
//       <body style="font-family: Arial, sans-serif; background-color: #f0fdf4; padding: 20px;">
//         <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          
//           <!-- Header -->
//           <div style="background: linear-gradient(135deg, #059669 0%, #047857 100%); padding: 40px; text-align: center;">
//             <h1 style="color: #ffffff; margin: 0; font-size: 28px;">Welcome to Zakat Management! 🎉</h1>
//           </div>

//           <!-- Body -->
//           <div style="padding: 40px;">
//             <p style="color: #374151; font-size: 16px; margin-bottom: 20px;">
//               Dear ${name},
//             </p>
            
//             <p style="color: #374151; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
//               Thank you for joining our Zakat Management System! We're excited to have you as part of our community dedicated to making charitable giving easier and more impactful.
//             </p>

//             <div style="background-color: #f0fdf4; padding: 20px; border-radius: 8px; border-left: 4px solid #059669; margin: 30px 0;">
//               <h3 style="color: #059669; margin: 0 0 10px;">Getting Started:</h3>
//               <ul style="color: #374151; margin: 0; padding-left: 20px;">
//                 <li style="margin-bottom: 8px;">Browse active campaigns</li>
//                 <li style="margin-bottom: 8px;">Make your first donation</li>
//                 <li style="margin-bottom: 8px;">Track your contribution history</li>
//                 <li>Receive updates on campaign progress</li>
//               </ul>
//             </div>

//             <p style="color: #374151; font-size: 16px; line-height: 1.6; margin-top: 30px;">
//               If you have any questions, feel free to reach out to our support team.
//             </p>

//             <p style="color: #374151; font-size: 16px; margin-top: 30px;">
//               Best regards,<br>
//               <strong style="color: #059669;">The Zakat Management Team</strong>
//             </p>
//           </div>

//           <!-- Footer -->
//           <div style="background-color: #f9fafb; padding: 20px; text-align: center; border-top: 1px solid #e5e7eb;">
//             <p style="color: #9ca3af; font-size: 12px; margin: 0;">
//               © ${new Date().getFullYear()} Zakat Management System. All rights reserved.
//             </p>
//           </div>

//         </div>
//       </body>
//       </html>
//     `,
//     text: `
//       Welcome to Zakat Management System!
      
//       Dear ${name},
      
//       Thank you for joining our platform. We're excited to have you!
      
//       Getting Started:
//       - Browse active campaigns
//       - Make your first donation
//       - Track your contribution history
//       - Receive updates on campaign progress
      
//       Best regards,
//       The Zakat Management Team
//     `,
//   };

//   try {
//     const info = await transporter.sendMail(mailOptions);
//     console.log('✅ Welcome email sent successfully:', info.messageId);
//     return { success: true, messageId: info.messageId };
//   } catch (error) {
//     console.error('❌ Error sending welcome email:', error);
//     // Don't throw error for welcome email - it's not critical
//     return { success: false, error: error.message };
//   }
// };

// /**
//  * Send donation receipt email
//  * @param {string} email - Recipient email address
//  * @param {Object} donationData - Donation details
//  * @returns {Promise} - Email send result
//  */
// const sendDonationReceipt = async (email, donationData) => {
//   const { amount, campaignName, date, transactionId } = donationData;
  
//   const mailOptions = {
//     from: process.env.EMAIL_FROM || `Zakat Management <${process.env.EMAIL_USER}>`,
//     to: email,
//     subject: 'Donation Receipt - Thank You!',
//     html: `
//       <!DOCTYPE html>
//       <html>
//       <head>
//         <meta charset="utf-8">
//         <title>Donation Receipt</title>
//       </head>
//       <body style="font-family: Arial, sans-serif; background-color: #f0fdf4; padding: 20px;">
//         <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden;">
          
//           <div style="background: linear-gradient(135deg, #059669 0%, #047857 100%); padding: 40px; text-align: center;">
//             <h1 style="color: #ffffff; margin: 0;">Thank You! 💚</h1>
//           </div>

//           <div style="padding: 40px;">
//             <p style="color: #374151; font-size: 16px;">Your donation has been received successfully!</p>
            
//             <div style="background-color: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0;">
//               <table style="width: 100%;">
//                 <tr>
//                   <td style="color: #6b7280; padding: 8px 0;">Amount:</td>
//                   <td style="color: #059669; font-weight: bold; text-align: right;">${amount}</td>
//                 </tr>
//                 <tr>
//                   <td style="color: #6b7280; padding: 8px 0;">Campaign:</td>
//                   <td style="color: #374151; text-align: right;">${campaignName}</td>
//                 </tr>
//                 <tr>
//                   <td style="color: #6b7280; padding: 8px 0;">Date:</td>
//                   <td style="color: #374151; text-align: right;">${date}</td>
//                 </tr>
//                 <tr>
//                   <td style="color: #6b7280; padding: 8px 0;">Transaction ID:</td>
//                   <td style="color: #374151; text-align: right; font-family: monospace; font-size: 12px;">${transactionId}</td>
//                 </tr>
//               </table>
//             </div>

//             <p style="color: #6b7280; font-size: 14px; margin-top: 30px;">
//               Your generosity makes a real difference. Thank you for your support!
//             </p>
//           </div>

//           <div style="background-color: #f9fafb; padding: 20px; text-align: center;">
//             <p style="color: #9ca3af; font-size: 12px; margin: 0;">
//               © ${new Date().getFullYear()} Zakat Management System
//             </p>
//           </div>

//         </div>
//       </body>
//       </html>
//     `,
//   };

//   try {
//     const info = await transporter.sendMail(mailOptions);
//     return { success: true, messageId: info.messageId };
//   } catch (error) {
//     console.error('❌ Error sending donation receipt:', error);
//     return { success: false, error: error.message };
//   }
// };

// module.exports = {
//   sendOTPEmail,
//   sendWelcomeEmail,
//   sendDonationReceipt,
//   transporter, // Export for testing
// };
import dotenv from 'dotenv';
dotenv.config();
import nodemailer from 'nodemailer';

// Create email transporter using Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Verify transporter configuration
transporter.verify((error, success) => {
  if (error) {
    console.error('❌ Email configuration error:', error);
  } else {
    console.log('✅ Email service ready to send messages');
  }
});

/**
 * Send OTP email to user
 */
export const sendOTPEmail = async (email, otp) => {
  const mailOptions = {
    from: process.env.EMAIL_FROM || `Zakat Management <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Password Reset OTP - Zakat Management System',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Password Reset OTP</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: 'Arial', sans-serif; background-color: #f0fdf4;">
        <table role="presentation" style="width: 100%; border-collapse: collapse;">
          <tr>
            <td align="center" style="padding: 40px 0;">
              <table role="presentation" style="width: 600px; border-collapse: collapse; background-color: #ffffff; border-radius: 16px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                <tr>
                  <td style="padding: 40px 40px 30px; background: linear-gradient(135deg, #059669 0%, #047857 100%); border-radius: 16px 16px 0 0; text-align: center;">
                    <div style="width: 80px; height: 80px; background-color: rgba(255, 255, 255, 0.2); border-radius: 16px; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center;">
                      <span style="color: #ffffff; font-size: 40px;">🔐</span>
                    </div>
                    <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold;">Password Reset Request</h1>
                    <p style="margin: 10px 0 0; color: rgba(255, 255, 255, 0.9); font-size: 14px;">Zakat Management System</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 40px;">
                    <p style="margin: 0 0 20px; color: #374151; font-size: 16px; line-height: 1.6;">Hello,</p>
                    <p style="margin: 0 0 30px; color: #374151; font-size: 16px; line-height: 1.6;">
                      We received a request to reset your password. Use the following One-Time Password (OTP) to complete the process:
                    </p>
                    <div style="background: linear-gradient(135deg, #f0fdf4 0%, #d1fae5 100%); padding: 30px; border-radius: 12px; text-align: center; margin: 30px 0; border: 2px solid #059669;">
                      <p style="margin: 0 0 10px; color: #047857; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">Your OTP Code</p>
                      <h2 style="margin: 0; color: #059669; font-size: 48px; font-weight: bold; letter-spacing: 12px; font-family: 'Courier New', monospace;">${otp}</h2>
                    </div>
                    <div style="background-color: #fef3c7; padding: 20px; border-radius: 8px; border-left: 4px solid #f59e0b; margin: 30px 0;">
                      <p style="margin: 0; color: #92400e; font-size: 14px; line-height: 1.6;">
                        ⏰ <strong>Important:</strong> This OTP will expire in <strong>5 minutes</strong>. Please use it immediately.
                      </p>
                    </div>
                    <p style="margin: 30px 0 0; color: #6b7280; font-size: 14px; line-height: 1.6;">
                      If you didn't request a password reset, please ignore this email.
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 30px 40px; background-color: #f9fafb; border-radius: 0 0 16px 16px; border-top: 1px solid #e5e7eb;">
                    <p style="margin: 0 0 10px; color: #6b7280; font-size: 14px; text-align: center;">
                      Best regards,<br><strong style="color: #059669;">Zakat Management Team</strong>
                    </p>
                    <p style="margin: 20px 0 0; color: #9ca3af; font-size: 12px; text-align: center; line-height: 1.5;">
                      © ${new Date().getFullYear()} Zakat Management System. All rights reserved.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `,
    text: `Your OTP Code: ${otp}. Expires in 5 minutes.`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ OTP Email sent successfully:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Error sending OTP email:', error);
    throw new Error('Failed to send OTP email');
  }
};

/**
 * Send welcome email to new user
 */
export const sendWelcomeEmail = async (email, name) => {
  const mailOptions = {
    from: process.env.EMAIL_FROM || `Zakat Management <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Welcome to Zakat Management System',
    html: ``, // Same as your original code
    text: `Welcome to Zakat Management System, ${name}!`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Welcome email sent successfully:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Error sending welcome email:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Send donation receipt email
 */
export const sendDonationReceipt = async (email, donationData) => {
  const { amount, campaignName, date, transactionId } = donationData;
  const mailOptions = {
    from: process.env.EMAIL_FROM || `Zakat Management <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Donation Receipt - Thank You!',
    html: ``, // Same as your original code
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Error sending donation receipt:', error);
    return { success: false, error: error.message };
  }
};

export { transporter };