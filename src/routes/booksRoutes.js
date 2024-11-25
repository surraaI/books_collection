const express = require('express');
const { getAllBooks, addBook, getBookById, updateBook, deleteBook, getRecommendations } = require('../controllers/booksController');
const router = express.Router();

router.get('/books', getAllBooks);
router.post('/books', addBook);
router.get('/books/:id', getBookById);
router.put('/books/:id', updateBook);
router.delete('/books/:id', deleteBook);
router.get('/books/recommendations', getRecommendations);

module.exports = router;
