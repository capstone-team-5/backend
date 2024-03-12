const express = require("express");
const review = express.Router();
const asyncWrapper = require('../utilities/middleware/asyncWrapper')
const validateReviews = require("../validations/validateReviews.js");

const {
  getAllReviews,
  getOneReview,
  addOneReview,
  updateOneReview,
  deleteOneReview,
} = require("../queries/reviewQuery.js");


const reviewErrorHandler = (err, req, res, next) => {
  if (err) {
    const statusCode = err.statusCode || 500;
    const errorMessage = err.message || "Internal Server Error";
    res.status(statusCode).json({ error: err.message });
  } else {
    next(); //this forwards everything to the middleware
  }
};

// INDEX - show all reviews
review.get("/", asyncWrapper(async (req, res) => {
  const allReviews = await getAllReviews();
  if (allReviews.length) {
    res.status(200).json(allReviews);
  } else {
    res.status(500).json({ error: "Server Error" });
  }
}));


// Show one review by id

review.get("/:id", async (request, response) => {
  const { id } = request.params;
  const { error, result } = await getOneReview(id);
  if (error?.code === 0) {
    response.status(404).json({ error: "Review Not Found" });
  } else if (error) {
    response.status(500).json({ error: "Server Error" });
  } else {
    response.status(200).json(result);
  }
});

// Add one review

review.post("/", validateReviews, async (request, response) => {
  const { error, result } = await addOneReview(request.body);
  if (error) {
    response.status(500).json({ error: "Server Error" });
  } else {
    response.status(201).json(result);
  }
});

// Update one review

review.put("/:id", validateReviews, async (request, response) => {
  const { id } = request.params;
  const { error, result } = await updateOneReview(id, request.body);
  if (error) {
    response.status(500).json({ error: "Server Error - Could not update" });
  } else {
    response.status(200).json({ result });
  }
});

// Delete one review

review.delete("/:id", async (request, response) => {
  const { id } = request.params;
  const { error, result } = await deleteOneReview(id);
  if (error) {
    response.status(404).json({ error: "Review Not Found" });
  } else {
    response.status(200).json(result);
  }
});


// a catch-all route at the end of your review router to handle requests to non-existent review routes. This can provide a clearer response to clients making requests to undefined endpoints
review.all('*', (req, res, next) => {
  const err = new Error(`The requested resource ${req.originalUrl} was not found on this server.`);
  err.statusCode = 404;
  next(err);
});


// By adding review.use(reviewErrorHandler); at the end of your review router file (but before you export it), you ensure that any errors thrown or passed with next(err) in your review routes will be handled by reviewErrorHandler. This error handler will not affect other routes in your application that are not part of the review router, allowing you to tailor the error response for this particular set of routes.
// this adds the error handler as middleware. What is middleware? Middleware in Express are functions that have access to the request object (req), the response object (res), and the next middleware function in the application’s request-response cycle. The next middleware function is commonly denoted by a variable named next.
review.use(reviewErrorHandler);

module.exports = review;
