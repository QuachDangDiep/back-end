// controllers/bookingController.js
const admin = require('firebase-admin');
const db = admin.firestore();

// Tạo đơn đặt vé
exports.createBooking = async (req, res) => {
  const { bookingId, userId, movieId, seats, bookingTime, status, expiresAt } = req.body;

  // Kiểm tra các trường bắt buộc
  if (!bookingId || !userId || !movieId || !seats || !bookingTime || !status || !expiresAt) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    await db.collection('bookings').doc(bookingId).set({
      bookingId,
      userId,
      movieId,
      seats,
      bookingTime,
      status,
      expiresAt,
    });
    res.status(201).json({ message: 'Booking created successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Lấy danh sách đặt vé của người dùng
exports.getBookings = async (req, res) => {
  const { userId } = req.query; // Lấy userId từ query

  try {
    const bookingsSnapshot = await db.collection('bookings').where('userId', '==', userId).get();
    const bookings = bookingsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(bookings);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
