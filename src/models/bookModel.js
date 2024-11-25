const pool = require('../utils/db'); 

const getAll = async () => {
  try {
    const result = await pool.query('SELECT * FROM books');
    return result.rows;
  } catch (error) {
    throw error;
  }
};


const getById = async (id) => {
  try {
    const result = await pool.query('SELECT * FROM books WHERE id = $1', [id]);
    return result.rows[0]; 
  } catch (error) {
    throw error;
  }
};


const create = async ({ title, author, isbn, publishedYear }) => {
  try {
    const result = await pool.query(
      'INSERT INTO books (title, author, isbn, published_year) VALUES ($1, $2, $3, $4) RETURNING *',
      [title, author, isbn, publishedYear]
    );
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

const update = async (id, { title, author, isbn, publishedYear }) => {
  try {
    const result = await pool.query(
      'UPDATE books SET title = $1, author = $2, isbn = $3, published_year = $4 WHERE id = $5 RETURNING *',
      [title, author, isbn, publishedYear, id]
    );
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

const deleteById = async (id) => {
  try {
    await pool.query('DELETE FROM books WHERE id = $1', [id]);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  deleteById,
};
