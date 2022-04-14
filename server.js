const express = require("express");
const mongoose = require("mongoose");
const Book = require("./models/book.js");
require("dotenv").config();

const { MONGODB_URL } = process.env;

const app = express();
const port = 3000;

mongoose.connect(MONGODB_URL);

app.use(express.json());

app.get("/", (req, res) => {
  Book.find({}).then((data) => {
    res.send(data);
  });
});

app.get("/:id", (req, res, next) => {
  const id = req.params.id;
  Book.findById(id)
    .then((data) => {
      res.send(data);
    })
    .catch(() => {
      next();
    });
});

app.post("/", (req, res) => {
  const title = req.body.title;
  const isbn = req.body.isbn;
  const author = req.body.author;
  const description = req.body.description;
  const published_date = req.body.published_date;
  const number_of_pages = req.body.number_of_pages;
  const publisher = req.body.publisher;

  const newBook = Book({
    title,
    isbn,
    author,
    description,
    published_date,
    number_of_pages,
    number_of_pages,
    publisher,
  });
  newBook
    .save()
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((error) => {
      res.status(400).json({ error: error.message });
    });
});

app.delete("/:id", (req, res, next) => {
  const id = req.params.id;
  Book.findByIdAndDelete(id)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch(() => {
      next();
    });
});

app.patch("/:id", (req, res, next) => {
  const id = req.params.id;
  const updatedObject = req.body;
  Book.findByIdAndUpdate(id, { ...updatedObject }, { new: true })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch(() => {
      next();
    });
});

app.use((req, res, next) => {
  res.status(400).send("ERROR DUDE!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
