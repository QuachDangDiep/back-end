// controllers/userController.js
const admin = require('firebase-admin');
const db = admin.firestore();

// Đăng ký người dùng
exports.registerUser = async (req, res) => {
  const { userId, username, email } = req.body;

  // Kiểm tra các trường bắt buộc
  if (!userId || !username || !email) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    await db.collection('users').doc(userId).set({
      userId,
      username,
      email,
      createdAt: new Date().toISOString(),
    });
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Lấy thông tin người dùng từ Firestore
exports.getUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const userDoc = await db.collection('users').doc(userId).get();
    if (!userDoc.exists) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(userDoc.data());
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
