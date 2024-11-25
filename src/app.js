const express = require('express');
const dotenv = require('dotenv');
const booksRoutes = require('./routes/booksRoutes'); 
const bodyParser = require('body-parser');

dotenv.config();

const app = express();

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 


app.use('/api', booksRoutes); 

app.get('/', (req, res) => {
  res.status(200).send('Welcome to the Books Collection API!');
});


app.use((req, res, next) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;
