// routes/seatRoutes.js
const express = require('express');
const { addSeat, getSeats } = require('../controllers/seatController');

const router = express.Router();

router.post('/', addSeat);
router.get('/', getSeats);

module.exports = router;
