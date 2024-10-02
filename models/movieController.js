// controllers/movieController.js
const admin = require('firebase-admin');

// Thêm phim
exports.addMovie = async (req, res) => {
  const { movieId, title, showtimes, duration, genre } = req.body;

  try {
    await db.collection('movies').doc(movieId).set({
      movieId,
      title,
      showtimes,
      duration,
      genre,
    });
    res.status(201).json({ message: 'Movie added successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Lấy danh sách phim
exports.getMovies = async (req, res) => {
  try {
    const moviesSnapshot = await db.collection('movies').get();
    const movies = moviesSnapshot.docs.map(doc => doc.data());
    res.status(200).json(movies);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
