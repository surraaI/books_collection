const BookModel = require('../models/bookModel'); 

const getAllBooks = async (req, res) => {
  try {
    const books = await BookModel.getAll();
    res.status(200).json({ success: true, data: books });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: `Server error: ${error}` });
  }
};

const getBookById = async (req, res) => {
  const { id } = req.params;
  try {
    const book = await BookModel.getById(id);
    if (!book) {
      return res.status(404).json({ success: false, message: 'Book not found' });
    }
    res.status(200).json({ success: true, data: book });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: `Server error: ${error}` });
  }
};

const addBook = async (req, res) => {
  const { title, author, isbn, publishedYear } = req.body;
  if (!title || !author || !isbn || !publishedYear) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }
  try {
    const newBook = await BookModel.create({ title, author, isbn, publishedYear });
    res.status(201).json({ success: true, data: newBook });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: `Server error: ${error}` });
  }
};

const updateBook = async (req, res) => {
  const { id } = req.params;
  const { title, author, isbn, publishedYear } = req.body;
  if (!title || !author || !isbn || !publishedYear) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }
  try {
    const book = await BookModel.getById(id);
    if (!book) {
      return res.status(404).json({ success: false, message: 'Book not found' });
    }
    const updatedBook = await BookModel.update(id, { title, author, isbn, publishedYear });
    res.status(200).json({ success: true, data: updatedBook });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: `Server error: ${error}` });
  }
};

const deleteBook = async (req, res) => {
  const { id } = req.params;
  try {
    const book = await BookModel.getById(id);
    if (!book) {
      return res.status(404).json({ success: false, message: 'Book not found' });
    }
    await BookModel.deleteById(id);
    res.status(200).json({ success: true, message: 'Book deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: `Server error: ${error}` });
  }
};

const getRecommendations = async (req, res) => {
  try {
    const response = await BookModel.getAll();
    const randomIndex = Math.floor(Math.random() * response.length);
    const randomBook = response[randomIndex];
    return res.status(200).json({ success: true, data: randomBook });}
  catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: `Server error: ${error}` });
  }
    
    
};

module.exports = {
  getAllBooks,
  getBookById,
  addBook,
  updateBook,
  deleteBook,
  getRecommendations,
};
