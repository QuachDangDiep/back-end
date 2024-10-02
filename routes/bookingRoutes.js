// routes/bookingRoutes.js
const express = require('express');
const { createBooking, getBookingsByUser } = require('../controllers/bookingController');

const router = express.Router();

router.post('/', createBooking);
router.get('/user/:userId', getBookingsByUser);

module.exports = router;
