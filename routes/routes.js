const express = require("express");
const pdf = require('pdf-parse');
const fs = require('fs');
const {
  generateTextRoute,
  convertCode,
  homeGet,
  extractData,
  convertPdf,
} = require("../controller/controller.js");

const router = express.Router();

router.get("/", homeGet);
router.post("/generate_text", generateTextRoute);
router.post("/convert", convertCode);
router.post("/extract-data", extractData);
// router.post("/convert-pdf", convertPdf);

module.exports = router;