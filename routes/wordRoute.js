const express = require("express");
const mediaController = require("../controllers/wordController");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "");
  },
  filename: function (req, file, cb) {
    cb(null, "temp.docx");
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    var ext = path.extname(file.originalname);

    if (ext !== ".docx"&& ext !== '.doc') {
      return cb(new Error("Only Word Files are allowed!"));
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
      name: "docxs",
      maxCount: 1,
    },
  ]),
  mediaController.create
);

module.exports = router;
