const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const BookStore = require("../models/Bookstore");
const { body, validationResult } = require("express-validator");

// Route 1: Get all books
router.get("/fetchbooks", fetchuser, async (req, res) => {
  try {
    const books = await BookStore.find({ author: req.user.id });
    res.json(books);

    // If no books found, return a message
    if (!books || books.length === 0) {
      return res.status(404).json({ message: "No books found" });
    }
  } catch (error) {
    console.error("Error while fetching books: ", error.message);
    return res.status(500).send("Internal Server error occurred");
  }
});

// Route 2: Add a new book
router.post(
  "/addbook",
  fetchuser,
  [
    body("cover", "Enter a valid cover URL").isURL(),
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Enter a valid description").isLength({ min: 5 }),
    body("genre", "Enter a valid genre").notEmpty(),
    body("price", "Enter a valid number").isNumeric(),
    body("tags", "Enter valid tags").isArray(),
  ],
  async (req, res) => {
    try {
      const { cover, title, description, genre, price, tags, status } =
        req.body;

      // If error, return Bad request and error
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // Create a new book
      const book = new BookStore({
        cover,
        title,
        description,
        genre,
        price,
        tags,
        status,
        author: req.user.id,
      });

      const savedBook = await book.save();
      res.json(savedBook);
    } catch (error) {
      console.error("Error while adding a book: ", error.message);
      return res.status(500).send("Internal Server error occurred");
    }
  }
);

// Route 3: update the books and details
router.put("/updateBook/:id", fetchuser, async (req, res) => {
  try {
    const { cover, title, description, genre, price, tags, status } = req.body;

    //create newBook object
    const newBook = {};

    if (cover) {
      newBook.cover = cover;
    }
    if (title) {
      newBook.title = title;
    }
    if (description) {
      newBook.description = description;
    }
    if (genre) {
      newBook.genre = genre;
    }
    if (price) {
      newBook.price = price;
    }
    if (tags) {
      newBook.tags = tags;
    }
    if (status) {
      newBook.status = status;
    }

    //find the book to update
    let book = await BookStore.findById(req.params.id);
    if (!book) {
      return res.status(404).send("Book Not Found");
    }

    if (book.author.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    book = await BookStore.findByIdAndUpdate(
      req.params.id,
      { $set: newBook },
      { new: true }
    );
    res.json({ book });
  } catch (error) {
    console.error("Error while updating book: ", error.message);
    return res.status(500).send("Internal Server error occurred");
  }
});

// Route 4: delete the book
router.delete("/deleteBook/:id", fetchuser, async (req, res) => {
  try {
    //find the book to delete
    let book = await BookStore.findById(req.params.id);
    if (!book) {
      return res.status(404).send("Book Not Found");
    }
    //allow deletion if author own the book
    if (book.author.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    book = await BookStore.findByIdAndDelete(req.params.id);
    res.json({ Success: "Book has been deleted" });
  } catch (error) {
    console.error("Error while Deleting book: ", error.message);
    return res.status(500).send("Internal Server error occurred");
  }
});

// Route 5: Get all books (Public route, no authentication required)
router.get("/fetchallbooks", async (req, res) => {
  try {
    // Fetch all books from the database
    const books = await BookStore.find();

    // If no books found, return a message
    if (!books || books.length === 0) {
      return res.status(404).json({ message: "No books found" });
    }

    // Return all books
    res.json(books);
  } catch (error) {
    console.error("Error while fetching books: ", error.message);
    return res.status(500).send("Internal Server error occurred");
  }
});


module.exports = router;
