# books_collection

This project is a RESTful API for managing a collection of books. It allows users to perform CRUD (Create, Read, Update, Delete) operations on a database of books and provides additional endpoints such as recommending a random book from the collection.

## Features
- Fetch all books in the collection.
- Fetch details of a specific book by its ID.
- Add a new book to the collection with proper validation.
- Update an existing book's details.
- Delete a book from the collection.
- Get a random book recommendation from the collection.
## Technologies Used
- Node.js: Runtime environment for executing JavaScript code.
- Express: Web framework for building APIs.
- PostgreSQL: Relational database for persistent data storage.

## Installation and Setup
### Prerequisites
- Node.js (v14+ recommended)
- PostgreSQL (Installed and configured)
- Git (for cloning the repository)

### Steps
Clone the Repository:

```git clone https://github.com/surraaI/books_collection```

move to books_collection directory

```cd books_collection```

Install Dependencies:
```npm install```

Configure Environment Variables: Create a .env file in the root directory and add your database credentials:

```
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_HOST=localhost
DB_NAME=books_collection
DB_PORT=5432 
```
Set Up the Database: Create the books_collection database in PostgreSQL:
```CREATE DATABASE books_collection;```

Run the SQL script to create the books table:
```
CREATE TABLE books (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    isbn VARCHAR(13) NOT NULL UNIQUE,
    published_year INT NOT NULL
);
```
Run the Application:
```npm start```