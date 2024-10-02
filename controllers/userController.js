// controllers/userController.js
const admin = require('firebase-admin');

// Đăng ký người dùng
exports.registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  
  try {
    const userRecord = await admin.auth().createUser({
      email,
      password,
      displayName: username,
    });
    
    // Lưu thông tin người dùng vào Firestore
    await db.collection('users').doc(userRecord.uid).set({
      userId: userRecord.uid,
      username,
      email,
      createdAt: admin.firestore.Timestamp.now(),
    });

    res.status(201).json({ message: 'User registered successfully', userId: userRecord.uid });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Lấy thông tin người dùng
exports.getUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const userDoc = await db.collection('users').doc(userId).get();
    if (!userDoc.exists) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(userDoc.data());
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
