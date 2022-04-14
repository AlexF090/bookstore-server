const mongoose = require("mongoose");

//Bedinung und default Werte
const bookSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    isbn: { type: String, required: true },
    author: { type: String, required: true },
    description: { type: String, required: true },
    published_date: { type: String, required: true },
    number_of_pages: { type: Number, required: true },
    publisher: { type: String, required: true },
  },
  { collection: "books" } //Ist so wie in mongodb (online)
);

module.exports = mongoose.model("books", bookSchema);
