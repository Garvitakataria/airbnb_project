const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { listingSchema, reviewSchema } = require("../schema.js");
const Listing = require("../models/listing.js");
const { isLoggedin, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer = require("multer");
const { storage } = require("../cloudconfig.js");
const upload = multer({ storage });

//index,create

router
  .route("/")
  .get(wrapAsync(listingController.index)) //index route
  .post(
    isLoggedin,
    upload.single("listing[image]"),
    validateListing,

    wrapAsync(listingController.createForm)
  ); //create route

//new route
router.get("/new", isLoggedin, wrapAsync(listingController.renderNewForm));

//edit route
router.get(
  "/:id/edit",
  isLoggedin,
  isOwner,
  wrapAsync(listingController.editForm)
);

//show update,delete

router
  .route("/:id")
  .get(wrapAsync(listingController.show)) //show route
  .put(
    isLoggedin,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.updateRoute)
  ) //update route
  .delete(isLoggedin, isOwner, wrapAsync(listingController.deleteRoute)); //delete route

module.exports = router;
