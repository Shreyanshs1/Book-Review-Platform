import Book from '../models/Book.js';

// GET /books - Get all books (with pagination)
export const getAllBooks = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const books = await Book.find().skip(skip).limit(limit);
    const total = await Book.countDocuments();

    res.json({
      page,
      totalPages: Math.ceil(total / limit),
      totalBooks: total,
      books,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch books', error: error.message });
  }
};

// GET /books/:id - Get book details
export const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch book', error: error.message });
  }
};

// POST /books - Add a new book (admin only for now, no auth yet)
export const addBook = async (req, res) => {
  try {
    const { title, author, description, genre, coverImage } = req.body;

    const newBook = new Book({
      title,
      author,
      description,
      genre,
      coverImage,
    });

    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add book', error: error.message });
  }
};
