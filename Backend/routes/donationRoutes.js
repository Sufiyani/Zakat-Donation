// import express from 'express';
// import {
//   createDonation,
//   getUserDonations,
//   getAllDonations,
//   updateDonationStatus,
//   getDonationStats
// } from '../controllers/donationController.js';
// import { protect, admin } from '../middleware/auth.js';

// const router = express.Router();

// router.post('/', protect, createDonation);
// router.get('/my-donations', protect, getUserDonations);
// router.get('/stats', protect, admin, getDonationStats);
// router.get('/', protect, admin, getAllDonations);
// router.put('/:id/status', protect, admin, updateDonationStatus);

// export default router;


import express from 'express';
import {
  createDonation,
  getUserDonations,
  getAllDonations,
  updateDonationStatus,
  getDonationStats
} from '../controllers/donationController.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

// Create new donation
router.post('/', protect, createDonation);

// Get user's donations - (Is line ko update kiya hai match karne ke liye)
router.get('/user', protect, getUserDonations);

// Admin routes
router.get('/stats', protect, admin, getDonationStats);
router.get('/', protect, admin, getAllDonations);
router.put('/:id/status', protect, admin, updateDonationStatus);

export default router;