const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { listingSchema, reviewSchema } = require("../schema.js");
const Review = require("../models/reviews.js");
const Listing = require("../models/listing.js");
const reviewController = require("../controllers/reviews.js");

const {
  validateReview,
  isLoggedin,
  isReviewAuthor,
} = require("../middleware.js");

//review route-post
router.post(
  "/",
  isLoggedin,
  validateReview,
  wrapAsync(reviewController.postReview)
);

//delete route-reviews
router.delete(
  "/:reviewId",
  isLoggedin,
  isReviewAuthor,
  wrapAsync(reviewController.deleteReview)
);

module.exports = router;
