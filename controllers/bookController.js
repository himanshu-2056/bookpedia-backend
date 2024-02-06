const Book = require("../models/Books");

const bookcreate = async (req, res) => {
  try {
    const { image, name, author, category, price, description } = req.body;
    const existingBook = await Book.findOne({ name });
    if (existingBook) {
      return res.status(400).json({ message: "Book already exists" });
    }
    const newBook = new Book({
      image,
      name,
      author,
      category,
      price,
      description,
    });
    await newBook.save();
    res.status(201).json({ message: "Book registered successfully", newBook });
  } catch (error) {
    console.error("Error registering book:", error);
    res.status(500).json({ message: "An error occurred" });
  }
};

const getBook = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).json({ message: "An error occurred" });
  }
};

const getSingleBook = async (req, res) => {
  try {
    const id = req.params._id;
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json(book);
  } catch (error) {
    console.error("Error fetching book:", error);
    res.status(500).json({ message: "An error occurred" });
  }
};

module.exports = { bookcreate, getBook, getSingleBook };
