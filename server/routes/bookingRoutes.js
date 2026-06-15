import express from 'express';
import { createBooking, getMyBookings, updateBookingStatus } from '../controllers/bookingController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, authorize('farmer'), createBooking);
router.get('/mybookings', protect, getMyBookings);
router.patch('/:id', protect, authorize('owner'), updateBookingStatus);

export default router;