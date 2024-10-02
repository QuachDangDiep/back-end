// controllers/seatController.js
const admin = require('firebase-admin');

// Thêm ghế
exports.addSeat = async (req, res) => {
  const { seatNumber, status, lockedUntil, userId } = req.body;

  try {
    await db.collection('seats').doc(seatNumber).set({
      seatNumber,
      status,
      lockedUntil: lockedUntil || null,
      userId: userId || null,
    });
    res.status(201).json({ message: 'Seat added successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Lấy ghế cho một bộ phim
exports.getSeats = async (req, res) => {
  try {
    const seatsSnapshot = await db.collection('seats').get();
    const seats = seatsSnapshot.docs.map(doc => doc.data());
    res.status(200).json(seats);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
