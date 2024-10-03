// controllers/movieController.js

const db = require('../config/firebase'); // Giả sử bạn đã cấu hình Firestore

// Lấy danh sách phim
exports.getMovies = async (req, res) => {
  try {
    const moviesSnapshot = await db.collection('movies').get();
    const movies = moviesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Thêm phim mới (ví dụ)
exports.addMovie = async (req, res) => {
  try {
    const newMovie = req.body;
    const movieRef = await db.collection('movies').add(newMovie);
    res.status(201).json({ id: movieRef.id, ...newMovie });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
