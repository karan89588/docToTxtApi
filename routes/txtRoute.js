const express = require("express");
const mediaController = require("../controllers/txtController");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "");
  },
  filename: function (req, file, cb) {
    cb(null, "temp.txt");
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    var ext = path.extname(file.originalname);

    if (ext !== ".txt") {
      return cb(new Error("Only Text files are allowed!"));
    }

    cb(null, true);
  },
});

const router = express.Router();

//post create new media
router.post(
  "/create",
  upload.fields([
    {
      name: "txts",
      maxCount: 1,
    },
  ]),
  mediaController.create
);

module.exports = router;
