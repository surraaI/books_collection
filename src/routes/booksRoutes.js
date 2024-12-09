const express = require('express');
const { getAllBooks, addBook, getBookById, updateBook, deleteBook, getRecommendations , getMyBooks} = require('../controllers/booksController');
const { authorizeRole, authenticateToken } = require('../middlewares/middlewares');
const router = express.Router();

router.get('/books/all', authenticateToken, authorizeRole('Admin') ,getAllBooks);
router.get('/books', authenticateToken, authorizeRole('User'), getAllBooks)
router.post('/books', authenticateToken, authorizeRole('User'), addBook);
router.get('/books/recommendations', authenticateToken, getRecommendations);
router.get('/books/:id', authenticateToken, getBookById);
router.put('/books/:id',authenticateToken, updateBook);
router.delete('/books/:id', authenticateToken, deleteBook);


module.exports = router;
