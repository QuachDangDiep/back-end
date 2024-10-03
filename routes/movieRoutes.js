// routes/movieRoutes.js
const express = require('express');
// const { getMovies, createMovie } = require('../controllers/movieController');
const { getMovies } = require('../controllers/movieController');


const router = express.Router();

// Route lấy danh sách phim
router.get('/', getMovies);

// Route thêm phim mới
router.post('/', createMovie);

module.exports = router;
