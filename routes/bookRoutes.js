const express = require("express");
const router = express.Router();
const {
  bookcreate,
  getBook,
  getSingleBook,
} = require("../controllers/bookController");

router.post("/bookcreate", bookcreate);
router.get("/getbook", getBook);
router.get("/book/:_id", getSingleBook);

module.exports = router;
