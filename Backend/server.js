// // import dotenv from 'dotenv';
// // import express from 'express';
// // import cors from 'cors';
// // import connectDB from './config/db.js';

// // import authRoutes from './routes/authRoutes.js';
// // import donationRoutes from './routes/donationRoutes.js';
// // import campaignRoutes from './routes/campaignRoutes.js';

// // dotenv.config();

// // connectDB();

// // const app = express();

// // app.use(cors());
// // app.use(express.json());
// // app.use(express.urlencoded({ extended: true }));


// // app.use('/api/auth', authRoutes);
// // app.use('/api/donations', donationRoutes);
// // app.use('/api/campaigns', campaignRoutes);


// // app.get('/', (req, res) => {
// //   res.json({ message: 'Donation & Zakat Management API' });
// // });


// // app.use((err, req, res, next) => {
// //   console.error(err.stack);
// //   res.status(500).json({ message: 'Something went wrong!' });
// // });

// // const PORT = process.env.PORT || 5000;

// // app.listen(PORT, () => {
// //   console.log(`🚀 Server running on port ${PORT}`);
// // });
// // import dotenv from 'dotenv';
// // dotenv.config();
// // import express from 'express';
// // import cors from 'cors';
// // import mongoose from 'mongoose';
// // import passport from 'passport';
// // import session from 'express-session';
// // import dotenv from 'dotenv';

// // // Routes import (Make sure to add .js extension)
// // import authRoutes from './routes/authRoutes.js';

// // // dotenv.config();

// // const app = express();

// // // ========================================
// // // MIDDLEWARE
// // // ========================================

// // app.use(
// //   cors({
// //     origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
// //     credentials: true,
// //   })
// // );

// // app.use(express.json());
// // app.use(express.urlencoded({ extended: true }));

// // app.use(
// //   session({
// //     secret: process.env.SESSION_SECRET || 'your-session-secret',
// //     resave: false,
// //     saveUninitialized: false,
// //     cookie: {
// //       secure: process.env.NODE_ENV === 'production',
// //       maxAge: 24 * 60 * 60 * 1000,
// //     },
// //   })
// // );

// // app.use(passport.initialize());
// // app.use(passport.session());

// // if (process.env.NODE_ENV === 'development') {
// //   app.use((req, res, next) => {
// //     console.log(`${req.method} ${req.path}`);
// //     next();
// //   });
// // }

// // // ========================================
// // // DATABASE CONNECTION
// // // ========================================

// // mongoose
// //   .connect(process.env.MONGODB_URI)
// //   .then(() => console.log('✅ MongoDB connected successfully'))
// //   .catch((error) => {
// //     console.error('❌ MongoDB connection error:', error);
// //     process.exit(1);
// //   });

// // // ========================================
// // // ROUTES
// // // ========================================

// // app.get('/', (req, res) => {
// //   res.json({
// //     success: true,
// //     message: 'Zakat Management API is running',
// //     version: '1.0.0',
// //     timestamp: new Date().toISOString(),
// //   });
// // });

// // app.use('/api/auth', authRoutes);

// // // ========================================
// // // ERROR HANDLING
// // // ========================================

// // app.use((req, res) => {
// //   res.status(404).json({
// //     success: false,
// //     message: 'Route not found',
// //     path: req.path,
// //   });
// // });

// // app.use((err, req, res, next) => {
// //   console.error('Error:', err);
  
// //   if (err.name === 'ValidationError') {
// //     const errors = Object.values(err.errors).map((e) => e.message);
// //     return res.status(400).json({ success: false, message: 'Validation Error', errors });
// //   }

// //   if (err.code === 11000) {
// //     return res.status(400).json({ success: false, message: 'Duplicate key error' });
// //   }

// //   res.status(err.statusCode || 500).json({
// //     success: false,
// //     message: err.message || 'Internal Server Error',
// //     ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
// //   });
// // });

// // // ========================================
// // // START SERVER
// // // ========================================

// // const PORT = process.env.PORT || 5000;
// // const server = app.listen(PORT, () => {
// //   console.log(`🚀 Server running on port ${PORT} (${process.env.NODE_ENV || 'development'})`);
// // });

// // // Graceful shutdown
// // const shutdown = () => {
// //   console.log('👋 Shutting down gracefully');
// //   server.close(() => {
// //     mongoose.connection.close();
// //     process.exit(0);
// //   });
// // };

// // process.on('SIGTERM', shutdown);
// // process.on('SIGINT', shutdown);

// // export default app;
// // Load environment variables FIRST - before ANY other imports
// // import dotenv from 'dotenv';
// // dotenv.config();

// // // Now import everything else
// // import express from 'express';
// // import cors from 'cors';
// // import session from 'express-session';
// // import connectDB from './config/db.js';
// // import passport from './config/passport.js';

// // // Import routes
// // import authRoutes from './routes/authRoutes.js';
// // import campaignRoutes from './routes/campaignRoutes.js';
// // import donationRoutes from './routes/donationRoutes.js';

// // // Initialize Express app
// // const app = express();

// // // Connect to MongoDB
// // connectDB();

// // // ============================================
// // // MIDDLEWARE
// // // ============================================
// // app.use(cors({
// //   origin: process.env.FRONTEND_URL || 'http://localhost:5173',
// //   credentials: true
// // }));

// // app.use(express.json());
// // app.use(express.urlencoded({ extended: true }));

// // // Session middleware (required for Passport)
// // app.use(session({
// //   secret: process.env.SESSION_SECRET || 'your_session_secret_key',
// //   resave: false,
// //   saveUninitialized: false,
// //   cookie: {
// //     secure: process.env.NODE_ENV === 'production',
// //     maxAge: 24 * 60 * 60 * 1000 // 24 hours
// //   }
// // }));

// // // Initialize Passport
// // app.use(passport.initialize());
// // app.use(passport.session());

// // // ============================================
// // // ROUTES
// // // ============================================
// // app.get('/', (req, res) => {
// //   res.json({ 
// //     message: 'Zakat Management API is running',
// //     endpoints: {
// //       auth: '/api/auth',
// //       campaigns: '/api/campaigns',
// //       donations: '/api/donations'
// //     }
// //   });
// // });

// // app.use('/api/auth', authRoutes);
// // app.use('/api/campaigns', campaignRoutes);
// // app.use('/api/donations', donationRoutes);

// // // ============================================
// // // ERROR HANDLING
// // // ============================================
// // app.use((err, req, res, next) => {
// //   console.error('Error:', err.stack);
// //   res.status(500).json({ 
// //     message: 'Something went wrong!',
// //     error: process.env.NODE_ENV === 'development' ? err.message : undefined
// //   });
// // });

// // // 404 Handler
// // app.use((req, res) => {
// //   res.status(404).json({ message: 'Route not found' });
// // });

// // // ============================================
// // // START SERVER
// // // ============================================
// // const PORT = process.env.PORT || 5000;
// // app.listen(PORT, () => {
// //   console.log(`✅ Server running on port ${PORT}`);
// //   console.log(`📱 Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:5173'}`);
// //   console.log(`🔐 Google OAuth: ${process.env.GOOGLE_CALLBACK_URL}`);
// // });


// // Load environment variables FIRST - before everything else
// import './config/env.js';

// import express from 'express';
// import cors from 'cors';
// import session from 'express-session';
// import connectDB from './config/db.js';
// import passport from './config/passport.js';

// // Import routes
// import authRoutes from './routes/authRoutes.js';
// import campaignRoutes from './routes/campaignRoutes.js';
// import donationRoutes from './routes/donationRoutes.js';

// console.log('🚀 Starting server...');

// // Initialize Express app
// const app = express();

// // Connect to MongoDB
// connectDB();

// // ============================================
// // MIDDLEWARE
// // ============================================
// app.use(cors({
//   origin: process.env.FRONTEND_URL || 'http://localhost:5173',
//   credentials: true
// }));

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Session middleware (required for Passport)
// app.use(session({
//   secret: process.env.SESSION_SECRET || 'your_session_secret_key',
//   resave: false,
//   saveUninitialized: false,
//   cookie: {
//     secure: process.env.NODE_ENV === 'production',
//     maxAge: 24 * 60 * 60 * 1000 // 24 hours
//   }
// }));

// // Initialize Passport
// app.use(passport.initialize());
// app.use(passport.session());

// // ============================================
// // ROUTES
// // ============================================
// app.get('/', (req, res) => {
//   res.json({ 
//     message: 'Zakat Management API is running',
//     endpoints: {
//       auth: '/api/auth',
//       campaigns: '/api/campaigns',
//       donations: '/api/donations'
//     }
//   });
// });

// app.use('/api/auth', authRoutes);
// app.use('/api/campaigns', campaignRoutes);
// app.use('/api/donations', donationRoutes);

// // ============================================
// // ERROR HANDLING
// // ============================================
// app.use((err, req, res, next) => {
//   console.error('Error:', err.stack);
//   res.status(500).json({ 
//     message: 'Something went wrong!',
//     error: process.env.NODE_ENV === 'development' ? err.message : undefined
//   });
// });

// // 404 Handler
// app.use((req, res) => {
//   res.status(404).json({ message: 'Route not found' });
// });

// // ============================================
// // START SERVER
// // ============================================
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`✅ Server running on port ${PORT}`);
//   console.log(`📱 Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:5173'}`);
//   console.log(`🔐 Google OAuth: ${process.env.GOOGLE_CALLBACK_URL}`);
// });




// 1. DNS Fix - Sab se pehle ye hona chahiye
import dns from 'node:dns';
dns.setDefaultResultOrder('ipv4first'); 
dns.setServers(['8.8.8.8', '8.8.4.4']); 

// 2. Load environment variables
import './config/env.js';

import express from 'express';
import cors from 'cors';
import session from 'express-session';
import connectDB from './config/db.js';
import passport from './config/passport.js';

// Import routes
import authRoutes from './routes/authRoutes.js';
import campaignRoutes from './routes/campaignRoutes.js';
import donationRoutes from './routes/donationRoutes.js';

console.log('🚀 Starting server...');

const app = express();

// Connect to MongoDB
connectDB();

// Middlewares
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: process.env.SESSION_SECRET || 'your_session_secret_key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 * 1000
  }
}));

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Zakat Management API is running' });
});

app.use('/api/auth', authRoutes);
app.use('/api/campaigns', campaignRoutes);
app.use('/api/donations', donationRoutes);

// Error Handling
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({ 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`📱 Frontend URL: ${process.env.FRONTEND_URL}`);
});