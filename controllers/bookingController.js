// controllers/bookingController.js
const admin = require('firebase-admin');

// Tạo đặt vé
exports.createBooking = async (req, res) => {
  const { bookingId, userId, movieId, seats, bookingTime, status, expiresAt } = req.body;

  try {
    await db.collection('bookings').doc(bookingId).set({
      bookingId,
      userId,
      movieId,
      seats,
      bookingTime: admin.firestore.Timestamp.fromDate(new Date(bookingTime)),
      status,
      expiresAt: admin.firestore.Timestamp.fromDate(new Date(expiresAt)),
    });
    res.status(201).json({ message: 'Booking created successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Lấy danh sách đặt vé cho người dùng
exports.getBookingsByUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const bookingsSnapshot = await db.collection('bookings').where('userId', '==', userId).get();
    const bookings = bookingsSnapshot.docs.map(doc => doc.data());
    res.status(200).json(bookings);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
