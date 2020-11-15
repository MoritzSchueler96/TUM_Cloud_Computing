/* eslint-disable quotes */
// require express and other modules
const express = require("express");
const app = express();
// Express Body Parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// require mongoose for the id
const mongoose = require("mongoose");

// Set Static File Directory
app.use(express.static(__dirname + "/public"));

/************
 * DATABASE *
 ************/

const db = require("./models");
const BooksModel = require("./models/books");

/**********
 * ROUTES *
 **********/

/*
 * HTML Endpoints
 */

app.get("/", function homepage(req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

/*
 * JSON API Endpoints
 */

app.get("/api", (req, res) => {
  // TODO: Document all your api endpoints below as a simple hardcoded JSON object.
  res.json({
    message: "Welcome to my app api!",
    documentationUrl: "", //leave this also blank for the first exercise
    baseUrl: "", //leave this blank for the first exercise
    endpoints: [
      {
        method: "GET",
        path: "/api",
        description: "Describes all available endpoints",
      },
      { method: "GET", path: "/api/profile", description: "Data about me" },
      {
        method: "GET",
        path: "/api/books/",
        description: "Get All books information",
      },
      // TODO: Write other API end-points description here like above
      {
        method: "GET",
        path: "/api/books/:id",
        description: "Get a book information",
      },
      {
        method: "POST",
        path: "/api/books/",
        description: "Add a book information into database",
      },
      {
        method: "PUT",
        path: "/api/books/:id",
        description: "Update a book information based upon the specified ID",
      },
      {
        method: "DELETE",
        path: "/api/books/:id",
        description: "Delete a book based upon the specified ID",
      },
    ],
  });
});

// TODO:  Fill the values
app.get("/api/profile", (req, res) => {
  res.json({
    name: "Spongebob Sqarepants",
    homeCountry: "Bikini Bottom",
    degreeProgram: "", //informatics or CSE.. etc
    email: "spongebob.squarepants@crusty-crab.de",
    deployedURLLink: "", //leave this blank for the first exercise
    apiDocumentationURL: "", //leave this also blank for the first exercise
    currentCity: "",
    hobbies: ["making crab burgers"],
  });
});

/*
 * Get All books information
 */
app.get("/api/books/", (req, res) => {
  /*
   * use the books model and query to mongo database to get all objects
   */
  db.books.find({}, function (err, books) {
    if (err) throw err;
    /*
     * return the object as array of json values
     */
    res.json(books);
  });
});

/*
 * Get a book information
 */
app.get("/api/books/:id", (req, res) => {
  /*
   * Get the book ID from the request parameters
   */
  const bookId = req.params.id;
  /*
   * use the books model and query to mongo database to get one objects
   */
  db.books
    .findOne({ _id: bookId })
    .exec()
    .then((result) => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

/*
 * Add a book information into database
 */
app.post("/api/books/", (req, res) => {
  /*
   * New Book information in req.body
   */
  console.log(req.body);
  /*
   * TODO: use the books model and create a new object
   * with the information in req.body
   */
  /*
   * return the new book information object as json
   */
  const book = new db.books({
    title: req.body.title,
    author: req.body.author,
    releaseDate: req.body.releaseDate,
    genre: req.body.genre,
    rating: req.body.rating,
    language: req.body.language,
  });

  book
    .save()
    .then((result) => {
      console.log(result);
    })
    .catch((err) => console.log(err));

  res.status(201).json({
    message: "Handling POST requests to /api/books",
    createdBook: book,
  });
});

/*
 * Update a book information based upon the specified ID
 */
app.put("/api/books/:id", (req, res) => {
  /*
   * Get the book ID and new information of book from the request parameters
   */
  const bookId = req.params.id;
  const bookNewData = req.body;
  console.log(`book ID = ${bookId} \n Book Data = ${bookNewData}`);

  /*
   * TODO: use the books model and find using the bookId and update the book information
   */
  /*
   * Send the updated book information as a JSON object
   */
  db.books
    .findOneAndUpdate(
      { _id: bookId },
      {
        $set: {
          title: req.body.title,
          author: req.body.author,
          releaseDate: req.body.releaseDate,
          genre: req.body.genre,
          rating: req.body.rating,
          language: req.body.language,
        },
      },
      { new: true }
    )
    .exec()
    .then((result) => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

/*
 * Delete a book based upon the specified ID
 */
app.delete("/api/books/:id", (req, res) => {
  /*
   * Get the book ID of book from the request parameters
   */
  const bookId = req.params.id;
  /*
   * TODO: use the books model and find using
   * the bookId and delete the book
   */
  /*
   * Send the deleted book information as a JSON object
   */
  db.books
    .findOneAndDelete({ _id: bookId })
    .exec()
    .then((result) => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

/**********
 * SERVER *
 **********/

// listen on the port 2000
const port = 2000;
app.listen(process.env.PORT || port, () => {
  console.log(
    "Express server is up and running on http://localhost:" + port + "/"
  );
});
