// routes/bookingRoutes.js
const express = require('express');
const router = express.Router();
const { createBooking, getBookings } = require('../controllers/bookingController'); // Đảm bảo đã nhập đúng

// Route để tạo đơn đặt vé
router.post('/', createBooking);

// Route để lấy danh sách đặt vé
router.get('/', getBookings); // Hàm getBookings phải được định nghĩa và nhập đúng

module.exports = router;
